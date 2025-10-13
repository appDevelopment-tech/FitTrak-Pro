import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthContextType {
  user: User | null;
  pupil: any | null;
  loading: boolean;
  signIn: (email: string, password: string, userType?: 'trainer' | 'pupil') => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TEMPORARY: Bypass auth for testing
const BYPASS_AUTH = true; // Временно включим для тестирования

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pupil, setPupil] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (BYPASS_AUTH) {
      // Тестовый режим (можно оставить для разработки)
      setTimeout(() => {
        setLoading(false);
      }, 100);
      return;
    }

    // Получаем текущую сессию
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          // Проверяем, является ли пользователь учеником
          await checkPupilProfile(session.user);
        }
      } catch (error) {
        console.error('Error in getSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Слушаем изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          await checkPupilProfile(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setPupil(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Проверяем профиль ученика в базе данных
  const checkPupilProfile = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', user.email)
        .single();

      if (data && !error) {
        setPupil(data);
      } else {
        setPupil(null);
      }
    } catch (error) {
      console.error('Error checking pupil profile:', error);
      setPupil(null);
    }
  };

  const signIn = async (email: string, password: string, userType?: 'trainer' | 'pupil') => {
    if (BYPASS_AUTH) {
      // Тестовый режим - симулируем успешный вход
      const testUser = {
        id: '1',
        email: email,
        app_metadata: {},
        user_metadata: {
          first_name: 'Test',
          last_name: 'User',
          is_trainer: userType === 'trainer',
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User;
      
      setUser(testUser);
      if (userType === 'pupil') {
        setPupil({
          id: '1',
          first_name: 'Test',
          last_name: 'Pupil',
          email: email,
          phone: '+1234567890',
        });
      }
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        setUser(data.user);
        // Проверяем профиль ученика
        await checkPupilProfile(data.user);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка входа');
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    if (BYPASS_AUTH) {
      // Тестовый режим - симулируем успешную регистрацию
      const testUser = {
        id: '1',
        email: email,
        app_metadata: {},
        user_metadata: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          is_trainer: false,
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User;
      
      setUser(testUser);
      setPupil({
        id: '1',
        trainer_id: 1, // Привязываем к первому тренеру
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: email,
        phone: userData.phone,
      });
      return;
    }

    try {
      // Регистрируем пользователя в Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            middle_name: userData.middleName,
            phone: userData.phone,
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Создаем профиль ученика в базе данных
        const { error: profileError } = await supabase
          .from('students')
          .insert({
            trainer_id: 1, // Привязываем к первому тренеру (можно сделать динамическим)
            first_name: userData.firstName,
            last_name: userData.lastName,
            middle_name: userData.middleName || '',
            birth_date: userData.birthDate,
            phone: userData.phone,
            email: email,
            join_date: new Date().toISOString().split('T')[0],
            status: 'pending',
            
            // Поля для родителей (если несовершеннолетний)
            parent_first_name: userData.parentFirstName || '',
            parent_last_name: userData.parentLastName || '',
            parent_middle_name: userData.parentMiddleName || '',
            parent_phone: userData.parentPhone || '',
            parent_email: userData.parentEmail || '',
            
            // Согласия
            rules_accepted: userData.contractAccepted,
            rules_accepted_date: new Date().toISOString().split('T')[0],
            parental_consent: userData.educationConsentAccepted,
            parental_consent_date: new Date().toISOString().split('T')[0],
          });

        if (profileError) {
          console.error('Error creating pupil profile:', profileError);
          // Не прерываем процесс, так как пользователь уже создан в Auth
        }
      }
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка регистрации');
    }
  };

  const signOut = async () => {
    if (BYPASS_AUTH) {
      setUser(null);
      setPupil(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      
      setUser(null);
      setPupil(null);
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка выхода');
    }
  };

  const resetPassword = async (email: string) => {
    if (BYPASS_AUTH) {
      // Тестовый режим - симулируем успешную отправку
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка сброса пароля');
    }
  };

  return (
    <AuthContext.Provider value={{ user, pupil, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

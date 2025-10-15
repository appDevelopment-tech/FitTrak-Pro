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

// Проверяем, настроен ли Supabase
const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pupil, setPupil] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Если Supabase не настроен, просто завершаем загрузку
      setLoading(false);
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
      async (event: string, session: any) => {
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
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    try {
      // Если пользователь - тренер, не ищем его в таблице students
      if ((user as any).user_metadata?.is_trainer) {
        setPupil(null);
        return;
      }

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
    console.log('signIn called with:', { email, password, userType, isSupabaseConfigured });

    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
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
    if (!isSupabaseConfigured) {
      throw new Error('Supabase не настроен. Установите VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в файле .env');
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
            trainer_id: '550e8400-e29b-41d4-a716-446655440000', // Main trainer UUID
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
            is_parent_representative: userData.isParentRepresentative || false,

            // Согласия
            privacy_policy_accepted: userData.privacyPolicyAccepted,
            privacy_policy_accepted_date: new Date().toISOString().split('T')[0],
            contract_accepted: userData.contractAccepted,
            contract_accepted_date: new Date().toISOString().split('T')[0],
            education_consent_accepted: userData.educationConsentAccepted,
            education_consent_accepted_date: new Date().toISOString().split('T')[0],
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
    if (!isSupabaseConfigured) {
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
    if (!isSupabaseConfigured) {
      throw new Error('Восстановление пароля недоступно без настройки Supabase');
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

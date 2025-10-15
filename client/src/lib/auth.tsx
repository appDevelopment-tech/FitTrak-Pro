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

// TEMPORARY: Bypass auth for testing
const BYPASS_AUTH = false; // Disabled to use real Supabase authentication

// Дополнительная проверка для отладки
console.log('Supabase configuration check:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  isSupabaseConfigured
});

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
      console.log('Using test authentication mode');
      // Если Supabase не настроен, используем тестовую аутентификацию
      const testUsers = {
        'petrusenko@fittrak.pro': { id: '1', name: 'Петрусенко Константин Владимирович', isTrainer: true },
        'ivanov@fittrak.pro': { id: '2', name: 'Иванов Иван', isTrainer: false },
        'student1@fittrak.pro': { id: '3', name: 'Студентович_1 Студент_1', isTrainer: false },
      };

      const testPasswords = ['trainer123', 'student123'];
      
      const user = testUsers[email as keyof typeof testUsers];
      console.log('Test user found:', user);
      
      if (user && testPasswords.includes(password)) {
        console.log('Test authentication successful');
        // Проверяем соответствие типа пользователя
        if (userType === 'trainer' && !user.isTrainer) {
          throw new Error('Ученики не могут войти через вход для тренеров');
        }
        if (userType === 'pupil' && user.isTrainer) {
          throw new Error('Тренеры должны использовать вход для тренеров');
        }

        const testUser = {
          id: user.id,
          email: email,
          app_metadata: {},
          user_metadata: {
            first_name: user.isTrainer ? 'Константин Владимирович' : user.name,
            last_name: user.isTrainer ? 'Петрусенко' : 'Test',
            is_trainer: user.isTrainer,
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User;
        
        setUser(testUser);
        
        if (userType === 'pupil') {
          setPupil({
            id: user.id,
            first_name: user.name.split(' ')[0],
            last_name: user.name.split(' ')[1] || 'Test',
            email: email,
            phone: user.id === '2' ? '+7 (999) 123-45-67' : '+7 (999) 987-65-43',
          });
        }
        return;
      } else {
        console.log('Test authentication failed');
        throw new Error('Неверные данные для входа');
      }
    }

    // Если дошли до сюда, значит Supabase настроен, но это не должно происходить
    console.log('Supabase is configured, but this should not happen in test mode');
    throw new Error('Supabase не настроен правильно');
  };

  const signUp = async (email: string, password: string, userData: any) => {
    if (!isSupabaseConfigured) {
      // Тестовый режим - симулируем успешную регистрацию
      const testUser = {
        id: Date.now().toString(), // Генерируем уникальный ID
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
        id: testUser.id,
        trainer_id: '1', // Привязываем к тренеру Петрусенко
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: email,
        phone: userData.phone || '+7 (999) 000-00-00',
        birth_date: userData.birthDate || '1990-01-01',
        status: 'active',
        join_date: new Date().toISOString().split('T')[0],
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

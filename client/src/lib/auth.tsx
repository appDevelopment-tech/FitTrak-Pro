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
    // Сначала проверяем localStorage для локального API
    const savedUser = localStorage.getItem('fitTrakUser');
    const savedPupil = localStorage.getItem('fitTrakPupil');
    const savedUserType = localStorage.getItem('fitTrakUserType');
    
    if (savedUser && savedUserType) {
      console.log('🔄 Restoring user from localStorage:', JSON.parse(savedUser));
      setUser(JSON.parse(savedUser));
      setPupil(savedPupil ? JSON.parse(savedPupil) : null);
      setLoading(false);
      return;
    }

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
      // СНАЧАЛА пробуем через наш API (приоритет SQLite базе)
      console.log('🔐 Попытка входа через API (SQLite)...');
      
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Успешный вход через наш API
        const loginResult = await response.json();
        console.log('✅ Успешный вход через API:', loginResult.user?.firstName, loginResult.user?.lastName);
        
        // Создаем фиктивный пользователь для совместимости
        const mockUser = {
          id: loginResult.user?.id || 'mock-id',
          email: email,
          user_metadata: {
            first_name: loginResult.user?.firstName,
            last_name: loginResult.user?.lastName,
            is_trainer: loginResult.user?.isTrainer || false,
          }
        };

        console.log('🔍 Mock user created:', {
          id: mockUser.id,
          email: mockUser.email,
          is_trainer: mockUser.user_metadata.is_trainer,
          userType: loginResult.userType
        });

        // Сохраняем пользователя в localStorage для восстановления при обновлении страницы
        localStorage.setItem('fitTrakUser', JSON.stringify(mockUser));
        localStorage.setItem('fitTrakPupil', JSON.stringify(loginResult.pupil || null));
        localStorage.setItem('fitTrakUserType', loginResult.userType);

        setUser(mockUser as any);
        setPupil(loginResult.pupil || null);
        return;
      } else {
        // API не сработал, пробуем Supabase как fallback
        console.log('⚠️ API вход не удался, пробуем Supabase...');
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message || 'Ошибка входа');
        }

        if (data.user) {
          setUser(data.user);
          // Проверяем профиль ученика
          await checkPupilProfile(data.user);
        }
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
      // Сначала создаем профиль ученика в базе данных через API
        const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          middleName: userData.middleName || '',
          birthDate: userData.birthDate,
          phone: userData.phone,
          email: email,
          password: password,
          
          // Поля для родителей (если несовершеннолетний)
          parentFirstName: userData.parentFirstName || '',
          parentLastName: userData.parentLastName || '',
          parentMiddleName: userData.parentMiddleName || '',
          parentPhone: userData.parentPhone || '',
          parentEmail: userData.parentEmail || '',
          isParentRepresentative: userData.isParentRepresentative || false,

          // Согласия
          privacyPolicyAccepted: userData.privacyPolicyAccepted,
          contractAccepted: userData.contractAccepted,
          educationConsentAccepted: userData.educationConsentAccepted,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка создания профиля ученика');
      }

      const result = await response.json();
      console.log('Профиль ученика создан:', result.pupil);

      // Теперь пытаемся создать пользователя в Supabase Auth (опционально)
      try {
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
          console.warn('Supabase Auth регистрация не удалась, но профиль создан:', error.message);
          // Не прерываем процесс, так как профиль уже создан в базе данных
        } else {
          console.log('Supabase Auth пользователь создан:', data.user);
        }
      } catch (supabaseError: any) {
        console.warn('Ошибка Supabase Auth, но профиль создан:', supabaseError.message);
        // Не прерываем процесс, так как профиль уже создан в базе данных
      }

    } catch (error: any) {
      throw new Error(error.message || 'Ошибка регистрации');
    }
  };

  const signOut = async () => {
    // Очищаем localStorage
    localStorage.removeItem('fitTrakUser');
    localStorage.removeItem('fitTrakPupil');
    localStorage.removeItem('fitTrakUserType');
    
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

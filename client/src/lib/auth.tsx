import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  pupil: any | null;
  loading: boolean;
  signIn: (email: string, password: string, userType?: 'trainer' | 'pupil') => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TEMPORARY: Bypass auth for testing
const BYPASS_AUTH = true;
const TEST_USER: User = {
  id: '1',
  email: 'test@fittrak.pro',
  app_metadata: {},
  user_metadata: {
    first_name: 'Test',
    last_name: 'User',
    is_trainer: true,
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

const TEST_PUPIL = {
  id: '1',
  first_name: 'Test',
  last_name: 'Pupil',
  email: 'pupil@fittrak.pro',
  phone: '+1234567890',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pupil, setPupil] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (BYPASS_AUTH) {
      // Simulate auth check delay
      setTimeout(() => {
        const savedUserType = localStorage.getItem('test_user_type');
        if (savedUserType === 'trainer') {
          setUser(TEST_USER);
          setPupil(null);
        } else if (savedUserType === 'pupil') {
          setPupil(TEST_PUPIL);
          setUser(null);
        }
        setLoading(false);
      }, 100);
    }
  }, []);

  const signIn = async (email: string, password: string, userType?: 'trainer' | 'pupil') => {
    if (BYPASS_AUTH) {
      if (userType === 'trainer') {
        localStorage.setItem('test_user_type', 'trainer');
        setUser(TEST_USER);
        setPupil(null);
      } else {
        localStorage.setItem('test_user_type', 'pupil');
        setPupil(TEST_PUPIL);
        setUser(null);
      }
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: email,
          password: password,
          userType: userType,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка входа');
      }

      const result = await response.json();

      if (result.userType === 'trainer') {
        setUser(result.user);
        setPupil(null);
      } else if (result.userType === 'pupil') {
        setPupil(result.pupil);
        setUser(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    if (BYPASS_AUTH) {
      localStorage.setItem('test_user', 'true');
      setUser(TEST_USER);
      return;
    }
  };

  const signOut = async () => {
    if (BYPASS_AUTH) {
      localStorage.removeItem('test_user_type');
      setUser(null);
      setPupil(null);
      return;
    }

    setUser(null);
    setPupil(null);
  };

  return (
    <AuthContext.Provider value={{ user, pupil, loading, signIn, signUp, signOut }}>
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

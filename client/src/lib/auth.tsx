import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (BYPASS_AUTH) {
      // Simulate auth check delay
      setTimeout(() => {
        const savedUser = localStorage.getItem('test_user');
        setUser(savedUser ? TEST_USER : null);
        setLoading(false);
      }, 100);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (BYPASS_AUTH) {
      localStorage.setItem('test_user', 'true');
      setUser(TEST_USER);
      return;
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
      localStorage.removeItem('test_user');
      setUser(null);
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
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

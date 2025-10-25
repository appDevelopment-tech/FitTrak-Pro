import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthContextType {
  user: User | null;
  userProfile: any | null; // User profile from our database
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  isAdmin: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Константы для ролей
const ADMIN_EMAILS = ['petrusenko@fittrak.pro']; // Можно расширить список
const TRAINER_EMAILS = ['petrusenko@fittrak.pro']; // Можно расширить список

// Функция для определения роли пользователя
const getUserRole = (email: string) => {
  if (ADMIN_EMAILS.includes(email)) return 'admin';
  if (TRAINER_EMAILS.includes(email)) return 'trainer';
  return 'student';
};

const isTrainerEmail = (email: string) => TRAINER_EMAILS.includes(email);

const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

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
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error in getSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    console.log('🔍 Loading user profile for:', authUser.email);
    
    try {
      console.log('📊 Searching in users table...');
      let { data, error } = await Promise.race([
        supabase
          .from('users')
          .select('*')
          .eq('email', authUser.email)
          .single(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Users table query timeout')), 5000)
        )
      ]) as any;

      console.log('📊 Users table result:', { 
        data: data ? 'found' : 'not found', 
        error: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      });

      if (error || !data) {
        console.log('📊 Searching in students table...');
        const { data: studentData, error: studentError } = await Promise.race([
          supabase
            .from('students')
            .select('*')
            .eq('email', authUser.email)
            .single(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Students table query timeout')), 5000)
          )
        ]) as any;

        console.log('📊 Students table result:', { 
          data: studentData ? 'found' : 'not found', 
          error: studentError?.message,
          code: studentError?.code,
          details: studentError?.details,
          hint: studentError?.hint
        });

        if (studentError || !studentData) {
          console.error('❌ Error loading user profile from both tables:', { 
            usersError: error?.message,
            studentsError: studentError?.message 
          });
          
          console.log('🔄 Creating fallback profile...');
          const fallbackProfile = {
            id: authUser.id,
            email: authUser.email,
            first_name: authUser.user_metadata?.first_name || 'Пользователь',
            last_name: authUser.user_metadata?.last_name || '',
            is_trainer: isTrainerEmail(authUser.email || ''),
            role: getUserRole(authUser.email || '')
          };
          
          console.log('✅ Fallback profile created:', fallbackProfile);
          setUserProfile(fallbackProfile);
          return;
        }

        data = {
          ...studentData,
          is_trainer: false,
          role: 'student'
        };
        console.log('✅ Student profile loaded:', { 
          id: data.id, 
          email: data.email, 
          role: data.role, 
          photo: data.photo ? 'present' : 'missing',
          firstName: data.first_name,
          lastName: data.last_name,
          middleName: data.middle_name,
          rawData: data
        });
      } else {
        data = {
          ...data,
          role: data.is_trainer ? 'admin' : 'student',
          photo: data.photo || localStorage.getItem(`trainer_photo_${data.email}`) || null
        };
        console.log('✅ Trainer profile loaded:', { 
          id: data.id, 
          email: data.email, 
          role: data.role, 
          is_trainer: data.is_trainer, 
          photo: data.photo ? 'present' : 'missing',
          firstName: data.first_name,
          lastName: data.last_name,
          middleName: data.middle_name,
          rawData: data
        });
      }

      setUserProfile(data);
    } catch (error) {
      console.error('❌ Error in loadUserProfile:', error);
      
      console.log('🔄 Creating fallback profile due to error...');
      const fallbackProfile = {
        id: authUser.id,
        email: authUser.email,
        first_name: authUser.user_metadata?.first_name || 'Пользователь',
        last_name: authUser.user_metadata?.last_name || '',
        is_trainer: isTrainerEmail(authUser.email || ''),
        role: getUserRole(authUser.email || '')
      };
      
      console.log('✅ Fallback profile created:', fallbackProfile);
      setUserProfile(fallbackProfile);
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await loadUserProfile(user);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Signing in through Supabase...', { email });

    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      if (data.user) {
        console.log('✅ Successfully signed in:', data.user.email);
        setUser(data.user);
        await loadUserProfile(data.user);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    console.log('🔐 Signing up through Supabase...', { email });

    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
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

      if (authError) {
        throw new Error(authError.message || 'Registration failed');
      }

      if (authData.user) {
        console.log('✅ User created in Supabase Auth:', authData.user.email);
        
        const { data: profileData, error: profileError } = await supabase
          .from('students')
          .insert({
            id: authData.user.id,
            email: email,
            first_name: userData.firstName,
            last_name: userData.lastName,
            middle_name: userData.middleName || null,
            phone: userData.phone || null,
            birth_date: userData.birthDate || null,
            trainer_id: userData.trainerId || null,
            weight: userData.weight || null,
            height: userData.height || null,
            goal: userData.goal || null,
            medical_notes: userData.medicalNotes || null,
            status: 'active',
            join_date: new Date().toISOString().split('T')[0],
            parent_first_name: userData.parentFirstName || null,
            parent_last_name: userData.parentLastName || null,
            parent_middle_name: userData.parentMiddleName || null,
            parent_phone: userData.parentPhone || null,
            parent_email: userData.parentEmail || null,
            parent_special_instructions: userData.parentSpecialInstructions || null,
            is_parent_representative: userData.isParentRepresentative || false,
            privacy_policy_accepted: userData.privacyPolicyAccepted || false,
            privacy_policy_accepted_date: userData.privacyPolicyAccepted ? new Date().toISOString().split('T')[0] : null,
            contract_accepted: userData.contractAccepted || false,
            contract_accepted_date: userData.contractAccepted ? new Date().toISOString().split('T')[0] : null,
            education_consent_accepted: userData.educationConsentAccepted || false,
            education_consent_accepted_date: userData.educationConsentAccepted ? new Date().toISOString().split('T')[0] : null,
          })
          .select()
          .single();

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        } else {
          console.log('✅ User profile created:', profileData);
          setUserProfile({
            ...profileData,
            role: 'student'
          });
        }

        setUser(authData.user);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message || 'Password reset failed');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setUserProfile(null);
      return;
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      
      setUser(null);
      setUserProfile(null);
    } catch (error: any) {
      throw new Error(error.message || 'Sign out failed');
    }
  };

  const isAdmin = userProfile?.role === 'admin' || userProfile?.is_trainer === true;
  const isStudent = userProfile?.role === 'student' || userProfile?.is_trainer === false;

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshUserProfile,
    isAdmin,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
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
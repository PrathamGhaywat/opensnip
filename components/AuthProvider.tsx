'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account, OAuthProvider } from '../lib/appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUser();
    } catch (error) {
      const err = error as { code?: number; message?: string; type?: string };
      if (err.code === 429) {
        throw new Error('Too many login attempts. Please wait a few minutes and try again.');
      } else if (err.code === 401) {
        throw new Error('Invalid email or password. Please check your credentials.');
      } else {
        throw new Error(err.message || 'Login failed. Please try again.');
      }
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      await account.create('unique()', email, password, name);
      await login(email, password);
    } catch (error) {
      const err = error as { code?: number; message?: string; type?: string };
      if (err.code === 429) {
        throw new Error('Too many signup attempts. Please wait a few minutes and try again.');
      } else if (err.code === 409) {
        throw new Error('An account with this email already exists. Please try logging in instead.');
      } else {
        throw new Error(err.message || 'Account creation failed. Please try again.');
      }
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const loginWithGitHub = async () => {
    account.createOAuth2Session(
      OAuthProvider.Github,
      `${window.location.origin}/dashboard`,
      `${window.location.origin}/login`
    );
  };

  const forgotPassword = async (email: string) => {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      const err = error as { code?: number; message?: string; type?: string };
      if (err.code === 429) {
        throw new Error('Too many password reset requests. Please wait a few minutes and try again.');
      } else {
        throw new Error(err.message || 'Failed to send reset email. Please try again.');
      }
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    loginWithGitHub,
    forgotPassword,
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

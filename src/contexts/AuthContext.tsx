import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authenticateUser, ROLE_DASHBOARDS } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('nutmilk_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, password: string): boolean => {
    const authenticatedUser = authenticateUser(username, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('nutmilk_user', JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nutmilk_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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

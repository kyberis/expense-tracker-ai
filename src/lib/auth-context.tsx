"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { SafeUser, getSession, logoutUser } from "./auth";

interface AuthContextValue {
  user: SafeUser | null;
  isLoaded: boolean;
  setUser: (user: SafeUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoaded: false,
  setUser: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setIsLoaded(true);
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoaded, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

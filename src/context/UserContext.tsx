"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getUser,
  setUser as setUserCookie,
  removeUser,
} from "@/shared/lib/cookies";
import { AuthenticatedUser } from "@/shared/types/users";

interface UserContextProps {
  user: AuthenticatedUser | null;
  login: (userData: AuthenticatedUser) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    setLoaded(true);
  }, []);

  const login = (userData: AuthenticatedUser) => {
    setUser(userData);
    setUserCookie(userData);
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  if (!loaded) return null;

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

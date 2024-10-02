"use client";

import supabase from "@/supabase/supabase.client";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isAuthInitialized: boolean;
  isLoggedIn: boolean;
};

const initialContextValue: AuthContextValue = {
  isAuthInitialized: false,
  isLoggedIn: false,
};

const AuthContext = createContext<AuthContextValue>(initialContextValue);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const value: AuthContextValue = {
    isAuthInitialized,
    isLoggedIn,
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (event === "INITIAL_SESSION") {
        setIsAuthInitialized(true);
      } else if (event === "SIGNED_IN") {
        router.push("/");
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

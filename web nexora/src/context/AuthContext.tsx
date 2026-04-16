import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchApi } from "../lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check current session on mount (useful if HTTP-only cookies maintain the backend auth state)
  // Our backend uses short-lived tokens in memory + refresh token HttpOnly cookie.
  // Actually, we need an endpoint to "get current user" via the cookie. Let's assume `/auth/me`. 
  // If no backend endpoint exists, we will rely purely on manual login tracking for this demo.
  useEffect(() => {
    async function checkAuth() {
      try {
        // Attempt to fetch user profile using secure session
        const data = await fetchApi<{ user: User }>("/users/me");
        setUser(data.user);
      } catch (error) {
        // Not authenticated
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetchApi("/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed:", e);
    }
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

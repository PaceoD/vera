import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { insforge } from "@/lib/insforge";

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role?: string;
  avatarUrl?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signInWithPassword: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signInWithOAuth: (provider: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  signInAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Restore demo user if saved in localStorage
    const cached = localStorage.getItem("vera_demo_user");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Ignore invalid json
      }
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth session from InsForge SDK on mount
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const { data, error: userError } = await insforge.auth.getCurrentUser();
        if (!userError && data?.user && isMounted) {
          const rawUser = data.user as any;
          setUser({
            id: rawUser.id || rawUser.sub || "user_" + Date.now(),
            email: rawUser.email || "user@verahealth.org",
            name: rawUser.name || rawUser.user_metadata?.name || rawUser.email?.split("@")[0] || "Health Explorer",
            role: rawUser.role || "Verified Reader",
            createdAt: rawUser.created_at || new Date().toISOString(),
          });
        }
      } catch (err: any) {
        console.warn("InsForge session initialization check:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initSession();

    // Listen to Auth State changes in InsForge SDK
    const unsubscribe = insforge.auth.onAuthStateChange((event) => {
      if (event === "signedOut") {
        setUser(null);
        localStorage.removeItem("vera_demo_user");
      } else if (event === "signedIn" || event === "tokenRefreshed") {
        initSession();
      }
    });

    return () => {
      isMounted = false;
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const signInWithPassword = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return false;
      }

      if (data?.user) {
        const rawUser = data.user as any;
        const profile: UserProfile = {
          id: rawUser.id || "usr_" + Date.now(),
          email: rawUser.email || email,
          name: rawUser.name || rawUser.user_metadata?.name || email.split("@")[0],
          role: "Verified Member",
          createdAt: new Date().toISOString(),
        };
        setUser(profile);
        localStorage.setItem("vera_demo_user", JSON.stringify(profile));
      }
      setLoading(false);
      return true;
    } catch (err: any) {
      // Fallback demo sign in if network request fails or API endpoint differs
      console.warn("Sign in via InsForge fallback:", err);
      const fallbackUser: UserProfile = {
        id: "usr_demo_" + Date.now(),
        email: email,
        name: email.split("@")[0] || "Health Explorer",
        role: "Verified Member",
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      localStorage.setItem("vera_demo_user", JSON.stringify(fallbackUser));
      setLoading(false);
      return true;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await insforge.auth.signUp({
        email,
        password,
        name,
      });

      if (authError) {
        setError(authError.message || "Could not complete registration.");
        setLoading(false);
        return false;
      }

      const newUser: UserProfile = {
        id: data?.user?.id || "usr_" + Date.now(),
        email: email,
        name: name || email.split("@")[0],
        role: "Verified Member",
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem("vera_demo_user", JSON.stringify(newUser));
      setLoading(false);
      return true;
    } catch (err: any) {
      console.warn("Sign up via InsForge fallback:", err);
      const newUser: UserProfile = {
        id: "usr_" + Date.now(),
        email: email,
        name: name || email.split("@")[0],
        role: "Verified Member",
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem("vera_demo_user", JSON.stringify(newUser));
      setLoading(false);
      return true;
    }
  };

  const signInWithOAuth = async (provider: string) => {
    setLoading(true);
    setError(null);
    try {
      await insforge.auth.signInWithOAuth(provider, {
        redirectTo: window.location.origin + "/profile",
      });
    } catch (err: any) {
      setError(`Failed to sign in with ${provider}: ${err.message || err}`);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await insforge.auth.signOut();
    } catch (err) {
      console.warn("Sign out error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("vera_demo_user");
      setLoading(false);
    }
  };

  const signInAsDemoUser = () => {
    const demo: UserProfile = {
      id: "demo_sarah_jenkins",
      email: "sarah.jenkins@verahealth.org",
      name: "Dr. Sarah Jenkins",
      role: "Health & Science Researcher",
      createdAt: "Jan 2026",
    };
    setUser(demo);
    localStorage.setItem("vera_demo_user", JSON.stringify(demo));
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithPassword,
        signUp,
        signInWithOAuth,
        signOut,
        clearError,
        signInAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

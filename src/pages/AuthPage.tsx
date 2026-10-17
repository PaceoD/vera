import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@/context/NavigationContext";

export function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { signInWithPassword, signUp, signInWithOAuth, signInAsDemoUser, error, loading, clearError } = useAuth();
  const { navigateTo } = useNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (!email || !email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    let success = false;
    if (mode === "signin") {
      success = await signInWithPassword(email, password);
    } else {
      if (!name) {
        setValidationError("Please enter your name.");
        return;
      }
      success = await signUp(email, password, name);
    }

    if (success) {
      navigateTo("profile");
    }
  };

  const handleDemoLogin = () => {
    signInAsDemoUser();
    navigateTo("profile");
  };

  return (
    <div className="min-h-screen pt-[100px] pb-[80px] bg-[#FFF8F3] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background blur elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6B46D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#2C2623]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="w-full max-w-[960px] bg-[#FFFFFF] border border-[#E5DCD3] rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
        
        {/* Left Editorial Branding Banner */}
        <div className="md:col-span-5 bg-[#2C2623] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D6B46D]/20 via-transparent to-transparent pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#E5DCD3] mb-8">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B46D]" />
              <span>Evidence-Based Health Platform</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-snug">
              Welcome to <span className="font-italic text-[#D6B46D] italic">Vera.</span>
            </h1>

            <p className="text-[#E5DCD3]/80 text-sm leading-relaxed mb-8">
              Access peer-reviewed clinical research, personalized article bookmarks, and unbiased health myth breakdowns backed by board-certified MDs and PhDs.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-xs text-[#E5DCD3]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B46D]" />
              <span>100% Independent & Unbiased Science</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#E5DCD3]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B46D]" />
              <span>Personalized Bookmark Collections</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#E5DCD3]">
              <CheckCircle2 className="w-4 h-4 text-[#D6B46D]" />
              <span>Database Sync & Citation Downloads</span>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Area */}
        <div className="md:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
          
          {/* Form Header Tabs */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5DCD3]/60">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setValidationError(null);
                  clearError();
                }}
                className={`text-lg font-serif transition-colors ${
                  mode === "signin"
                    ? "font-semibold text-[#2C2623] border-b-2 border-[#D6B46D] pb-1"
                    : "text-[#8C827A] hover:text-[#2C2623]"
                }`}
              >
                Sign In
              </button>
              <span className="text-[#E5DCD3]">|</span>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setValidationError(null);
                  clearError();
                }}
                className={`text-lg font-serif transition-colors ${
                  mode === "signup"
                    ? "font-semibold text-[#2C2623] border-b-2 border-[#D6B46D] pb-1"
                    : "text-[#8C827A] hover:text-[#2C2623]"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Alert Message Box */}
          <AnimatePresence mode="wait">
            {(validationError || error) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">{validationError || error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-[#2C2623] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DCD3] focus:border-[#D6B46D] focus:ring-1 focus:ring-[#D6B46D] outline-none text-sm text-[#2C2623] transition-all bg-[#FAF8F5]"
                    required={mode === "signup"}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#2C2623] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DCD3] focus:border-[#D6B46D] focus:ring-1 focus:ring-[#D6B46D] outline-none text-sm text-[#2C2623] transition-all bg-[#FAF8F5]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C2623] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DCD3] focus:border-[#D6B46D] focus:ring-1 focus:ring-[#D6B46D] outline-none text-sm text-[#2C2623] transition-all bg-[#FAF8F5]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#2C2623] hover:bg-[#1A1615] text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D6B46D]" />
                  <span>{mode === "signin" ? "Signing in..." : "Creating Account..."}</span>
                </>
              ) : (
                <>
                  <span>{mode === "signin" ? "Sign In to Account" : "Create Verified Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-6 border-t border-[#E5DCD3]/60 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-[#E5DCD3] bg-[#FAF8F5] hover:border-[#D6B46D] text-xs font-medium text-[#2C2623] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6B46D]" />
              <span>Explore as Demo Researcher (Instant Login)</span>
            </button>

            <button
              type="button"
              onClick={() => signInWithOAuth("google")}
              className="w-full py-2.5 px-4 rounded-xl border border-[#E5DCD3] hover:bg-[#FAF8F5] text-xs font-medium text-[#2C2623] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

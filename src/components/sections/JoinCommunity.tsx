import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AmbientBotanicalCanvas } from "@/components/ui/AmbientBotanicalCanvas";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function JoinCommunity() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative py-[112px] bg-transparent overflow-hidden border-t border-[#E5DCD3]/50">
      {/* Soft blush & peach backdrop ambient light glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-rose/12 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Continuous 60 FPS Ambient Botanical Canvas Particles (Soft blush petals & golden botanical fragments) */}
      <AmbientBotanicalCanvas preset="newsletter" count={36} />

      <div className="relative z-10 w-full max-w-[840px] mx-auto px-[32px]">
        {/* Newsletter Card with subtle blush backdrop glow focal point */}
        <div className="relative p-[40px] sm:p-[64px] rounded-[32px] bg-[#F8F3EE]/95 backdrop-blur-md border border-[#E5DCD3] shadow-[0_16px_48px_rgba(44,38,35,0.06)] text-center overflow-hidden">
          {/* Subtle pulse glow behind card focal point */}
          <div
            className="absolute inset-0 bg-rose/10 rounded-[32px] blur-2xl -z-10 pointer-events-none animate-pulse"
            style={{ animationDuration: "6s" }}
            aria-hidden="true"
          />

          <span className="inline-block text-[13px] font-medium text-rose uppercase tracking-widest mb-[16px]">
            Stay Informed
          </span>

          <h2 className="font-serif text-[36px] sm:text-[44px] font-semibold text-t-primary mb-[16px] leading-[1.2]">
            Stay informed, not overwhelmed.
          </h2>
          <p className="text-[18px] text-t-secondary max-w-[600px] mx-auto mb-[40px] leading-[1.6]">
            Receive clear, evidence-based updates on women's health—without clickbait or misinformation.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-[16px] max-w-[500px] mx-auto mb-[16px]"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  className="w-full sm:w-auto flex-1 h-[52px] px-[20px] rounded-input border border-[#E5DCD3] bg-[#FFF8F3] text-t-primary placeholder:text-t-muted focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose shadow-sm transition-all text-[16px]"
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto h-[52px] px-[32px] text-[16px] cursor-pointer">
                  Join Vera
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-[#96B59A]/15 border border-[#96B59A]/30 text-center max-w-[500px] mx-auto mb-4"
              >
                <div className="w-12 h-12 rounded-full bg-sage/20 text-sage flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-t-primary text-lg mb-1">
                  Welcome to Vera!
                </h3>
                <p className="text-sm text-t-secondary">
                  Thank you for subscribing with <strong className="text-t-primary">{email}</strong>. Check your inbox for your first verified evidence digest.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[14px] text-t-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

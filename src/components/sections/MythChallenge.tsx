import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { useNavigation } from "@/context/NavigationContext";

export function MythChallenge() {
  const { navigate } = useNavigation();
  const [answered, setAnswered] = useState(false);
  const [guess, setGuess] = useState<boolean | null>(null);

  const handleAnswer = (value: boolean) => {
    setGuess(value);
    setAnswered(true);
  };

  return (
    <section id="myth-challenge-section" className="relative py-[112px] overflow-hidden bg-transparent">
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[800px] mx-auto px-[32px]">
        <div className="text-center mb-[48px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary mb-[16px]">Myth or Fact?</h2>
          <p className="text-[18px] text-t-secondary">Test your knowledge against clinical research.</p>
        </div>

        <div className="p-[32px] md:p-[48px] rounded-[28px] bg-[#F8F3EE]/95 backdrop-blur-md border border-[#E5DCD3] shadow-[0_8px_32px_rgba(44,38,35,0.05)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!answered ? (
              <motion.div
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="text-[14px] font-medium text-t-muted uppercase tracking-wider mb-[24px]">Today's Health Myth</div>
                <h3 className="font-serif text-[32px] md:text-[40px] text-t-primary leading-[1.2] mb-[48px]">
                  "Lemon water delays periods."
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px]">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="w-full sm:w-[140px] py-[16px] rounded-btn border-2 border-[#E5DCD3] hover:border-[#D6B46D] text-[18px] font-medium text-t-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 bg-[#FFF8F3] hover:bg-[#FCF8F4] shadow-sm cursor-pointer"
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="w-full sm:w-[140px] py-[16px] rounded-btn border-2 border-[#E5DCD3] hover:border-[#D6B46D] text-[18px] font-medium text-t-primary transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 bg-[#FFF8F3] hover:bg-[#FCF8F4] shadow-sm cursor-pointer"
                  >
                    False
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-left"
              >
                <div aria-live="polite" className="sr-only">
                  Correct - FALSE. Current evidence suggests there is no scientific proof. Confidence: 94 percent.
                </div>
                
                <div className="flex items-center gap-[12px] mb-[24px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-sage/20 text-sage flex items-center justify-center shrink-0">
                    <Check className="w-[20px] h-[20px]" aria-hidden="true" />
                  </div>
                  <span className="text-[18px] font-semibold text-sage">{guess === false ? "Correct" : "Incorrect"} — FALSE</span>
                </div>
                
                <p className="text-[20px] text-t-primary leading-[1.6] mb-[24px]">
                  Current evidence suggests there is zero physiological mechanism by which citric acid delays uterine lining shedding.
                </p>
                
                <div className="mb-[32px]">
                  <div className="flex items-center justify-between text-[14px] font-medium mb-[8px]">
                    <span className="text-t-secondary">Clinical Confidence Score</span>
                    <span className="text-t-primary font-mono font-semibold">96%</span>
                  </div>
                  <div className="h-[8px] w-full bg-black/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "96%" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-sage"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px] pt-[24px] border-t border-[#E5DCD3]/60">
                  <div className="flex items-center gap-[12px] text-[14px] text-t-muted flex-wrap">
                    <span>Sources:</span>
                    <span className="text-t-secondary font-medium">WHO</span>
                    <span>&middot;</span>
                    <span className="text-t-secondary font-medium">NIH</span>
                    <span>&middot;</span>
                    <span className="text-t-secondary font-medium">ACOG</span>
                  </div>
                  
                  <EvidenceDNA strength={5} source="Systematic Review" />
                </div>
                
                <div className="mt-[32px]">
                  <a
                    href="/myths/lemon-water-delays-periods"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/myths/lemon-water-delays-periods");
                    }}
                    className="inline-flex items-center gap-2 text-[16px] font-semibold text-rose hover:text-rose-hover underline underline-offset-4 cursor-pointer"
                  >
                    Read Full Medical Breakdown <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { AmbientBotanicalCanvas } from "@/components/ui/AmbientBotanicalCanvas";
import { useNavigation } from "@/context/NavigationContext";

const faqs = [
  {
    q: "Is Vera a replacement for doctors?",
    a: "No. Vera helps you understand evidence and prepares you for informed conversations with healthcare professionals."
  },
  {
    q: "Where does Vera get its information?",
    a: "We synthesize findings from peer-reviewed clinical studies, systematic reviews, and guidelines from trusted medical institutions like WHO, NIH, and ACOG."
  },
  {
    q: "Is AI writing everything?",
    a: "No. AI helps organize information, but scientific evidence and editorial review guide the final content."
  },
  {
    q: "Is Vera free?",
    a: "Yes, our core evidence library is completely free and accessible to everyone."
  },
  {
    q: "Can I trust health information on social media?",
    a: "Often not. Social media algorithms prioritize engagement over accuracy. Vera exists to provide a verified alternative to trend-based health claims."
  }
];

export function FAQ() {
  const { navigateTo } = useNavigation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-[112px] bg-transparent overflow-hidden border-t border-b border-[#E5DCD3]/50">
      {/* Soft sage & muted olive accent background gradient */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#96B59A]/8 to-transparent"
        aria-hidden="true"
      />

      {/* Muted radial warmth glow spots */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sage/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Continuous 60 FPS Ambient Botanical Canvas Particles (Sage leaves & ivory paper fragments) */}
      <AmbientBotanicalCanvas preset="faq" count={32} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-[32px]">
        <div className="text-center mb-[64px]">
          <span className="inline-block text-[13px] font-medium text-t-muted uppercase tracking-widest mb-[12px]">
            Common Inquiries
          </span>
          <h2 className="font-serif text-[40px] font-semibold text-t-primary">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-[16px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-[#E5DCD3] rounded-[20px] bg-[#F8F3EE]/90 backdrop-blur-md overflow-hidden shadow-[0_4px_20px_rgba(44,38,35,0.03)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_8px_28px_rgba(44,38,35,0.06)] hover:-translate-y-[2px] transition-all duration-300 relative z-10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-[24px] text-left focus:outline-none focus-visible:bg-canvas transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-medium text-t-primary pr-[24px]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-[20px] h-[20px] text-t-secondary transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="p-[24px] pt-0 text-[16px] text-t-secondary leading-[1.6]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-[48px] text-center">
          <a
            href="#search"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("search");
            }}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-rose hover:underline cursor-pointer"
          >
            Have more questions? Search our full evidence library &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

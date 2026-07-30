import React from "react";
import { motion } from "motion/react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

export function Hero() {
  const { navigateTo } = useNavigation();

  return (
    <section id="hero-section" className="relative min-h-[85vh] flex items-center pt-[140px] pb-[96px] overflow-hidden bg-transparent">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Gentle paper grain & ambient light pulse overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light bg-repeat"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,248,243,0.4) 0%, transparent 80%)",
        }}
      />
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-rose/5 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      
      <div className="w-full max-w-[1280px] mx-auto px-[32px] grid lg:grid-cols-2 gap-[64px] items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[680px]"
        >
          <span className="inline-block text-t-muted text-[14px] font-medium tracking-wide mb-[24px]">
            Evidence-Based Women's Health
          </span>
          <h1 className="font-serif text-[42px] lg:text-[64px] leading-[1.1] font-semibold text-t-primary mb-[24px]">
            Evidence over myths.
          </h1>
          <p className="text-[18px] leading-[1.6] text-t-secondary mb-[48px]">
            Understand your health through evidence, not misinformation. Vera explains complex research in a way that's clear, compassionate, and backed by trusted scientific sources.
          </p>
          
          <SearchInput className="mb-[48px]" />
          
          <div className="flex flex-wrap items-center gap-[16px] mb-[48px]">
            <Button
              size="lg"
              onClick={() => navigateTo("search")}
              className="cursor-pointer font-medium focus:ring-2 focus:ring-rose/40"
            >
              Ask Vera
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigateTo("explore")}
              className="cursor-pointer font-medium focus:ring-2 focus:ring-rose/40"
            >
              Explore Topics
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-[24px] text-[14px] text-t-muted font-medium">
            <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" aria-hidden="true" /> Evidence-Based</div>
            <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" aria-hidden="true" /> Expert Reviewed</div>
            <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" aria-hidden="true" /> Research Backed</div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block relative"
          aria-hidden="true"
        >
        </motion.div>
      </div>
    </section>
  );
}

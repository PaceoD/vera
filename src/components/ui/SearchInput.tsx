import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useNavigation } from "@/context/NavigationContext";

const placeholders = [
  "Can stress delay periods?",
  "Does lemon water affect periods?",
  "Can Vitamin D deficiency cause hair fall?",
  "What are PCOS symptoms?",
  "Is irregular menstruation normal?"
];

export function SearchInput({ className }: { className?: string }) {
  const { navigateTo } = useNavigation();
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  
  useEffect(() => {
    if (isFocused || value) return;
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isFocused, value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo("search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex items-center w-full max-w-[680px] bg-[#F8F3EE]/95 border border-[#E5DCD3] rounded-input shadow-[0_4px_20px_rgba(44,38,35,0.04)] p-1.5 focus-within:ring-2 focus-within:ring-rose focus-within:ring-offset-2 focus-within:ring-offset-canvas transition-all duration-200",
        className
      )}
    >
      <div className="pl-4 pr-2 text-t-muted">
        <Search className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="relative flex-1 h-[48px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {(!isFocused && !value) && (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex items-center pointer-events-none"
            >
              <span className="text-t-muted truncate">{placeholders[index]}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search for health topics"
          className="w-full h-full bg-transparent outline-none text-t-primary z-10 relative"
        />
      </div>
      <Button type="submit" size="lg" className="shrink-0 ml-2 max-md:hidden cursor-pointer">
        Ask Vera
      </Button>
      <Button type="submit" size="md" className="shrink-0 ml-2 md:hidden cursor-pointer">
        Ask Vera
      </Button>
    </form>
  );
}

import React from "react";
import { Button } from "@/components/ui/Button";
import { useNavigation } from "@/context/NavigationContext";

const hubs = [
  { title: "Hormones 101", desc: "Understand your endocrine system and how it affects your daily life.", icon: "bg-lavender/10" },
  { title: "Pregnancy Basics", desc: "A week-by-week evidence guide to what's happening in your body.", icon: "bg-sage/10" },
];

export function LearningHub() {
  const { navigateTo } = useNavigation();

  return (
    <section id="learning-hub-section" className="relative py-[112px] bg-transparent border-t border-b border-[#E5DCD3]/50">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="mb-[64px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary mb-[16px]">Learning Hub</h2>
          <p className="text-[18px] text-t-secondary">Deep dives into foundational health topics.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px]">
          {hubs.map((hub, index) => (
            <div 
              key={index} 
              onClick={() => navigateTo("explore")}
              className="flex flex-col sm:flex-row overflow-hidden group rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 cursor-pointer"
            >
              <div className={`sm:w-[240px] h-[200px] sm:h-auto ${hub.icon} flex items-center justify-center p-[32px] shrink-0`}>
                 <div className="w-[100px] h-[100px] rounded-full bg-white/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 border border-white/80 shadow-sm" />
              </div>
              <div className="p-[32px] flex flex-col justify-center flex-1">
                <h3 className="text-[24px] font-semibold text-t-primary mb-[12px]">{hub.title}</h3>
                <p className="text-[16px] text-t-secondary mb-[24px] leading-[1.6]">{hub.desc}</p>
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo("explore");
                    }}
                    className="cursor-pointer"
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

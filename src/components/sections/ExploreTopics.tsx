import React from "react";
import { ArrowRight, Droplets, Activity, Baby, Sprout, Apple, Sparkles, Brain, Heart, Wind } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

const topics = [
  { name: "Menstrual Health", desc: "Understanding cycles, symptoms, and care.", count: 124, icon: Droplets },
  { name: "PCOS", desc: "Evidence-based management and research.", count: 86, icon: Activity },
  { name: "Pregnancy", desc: "Safe, verified guidance for every trimester.", count: 215, icon: Baby },
  { name: "Fertility", desc: "Science-backed insights on reproductive health.", count: 142, icon: Sprout },
  { name: "Nutrition", desc: "How diet truly impacts women's bodies.", count: 198, icon: Apple },
  { name: "Hair & Skin", desc: "Dermatologist-reviewed facts and myths.", count: 112, icon: Sparkles },
  { name: "Mental Health", desc: "The connection between hormones and mood.", count: 156, icon: Brain },
  { name: "Sexual Health", desc: "Clear, judgment-free medical information.", count: 134, icon: Heart },
  { name: "Menopause", desc: "Navigating changes with clinical evidence.", count: 175, icon: Wind },
];

export function ExploreTopics() {
  const { navigateTo } = useNavigation();

  return (
    <section id="explore-topics-section" className="relative py-[112px] overflow-hidden bg-transparent">
      {/* Subtle paper texture & faint botanical annotation lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1280 800" fill="none" stroke="#2C2623" strokeWidth="1">
          <path d="M 100 100 C 150 200, 200 300, 150 400" strokeDasharray="4 4" />
          <path d="M 1150 200 C 1100 350, 1050 500, 1100 650" strokeDasharray="4 4" />
          <text x="105" y="90" fontSize="10" fontFamily="monospace" fill="#2C2623">Fig. 1 — Botanical Taxonomy</text>
          <text x="1105" y="190" fontSize="10" fontFamily="monospace" fill="#2C2623">Ref 04.2 — Molecular Struct</text>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="mb-[56px]">
          <h2 className="font-serif text-[42px] font-semibold text-t-primary mb-[12px] tracking-tight">
            Explore Women's Health
          </h2>
          <p className="text-[18px] text-t-secondary">
            Browse evidence-based information organized by topic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {topics.map((topic) => (
            <div 
              key={topic.name} 
              onClick={() => navigateTo("explore")}
              className="group relative p-[32px] flex flex-col items-start rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300 cursor-pointer"
            >
              <div className="w-[44px] h-[44px] rounded-full bg-[#FFF8F3] flex items-center justify-center text-t-primary mb-[20px] shadow-sm border border-[#E5DCD3]">
                <topic.icon className="w-[20px] h-[20px] stroke-[1.5]" aria-hidden="true" />
              </div>
              
              <h3 className="text-[20px] font-semibold text-t-primary mb-[8px]">
                {topic.name}
              </h3>
              
              <p className="text-t-secondary text-[15px] leading-relaxed mb-[24px] flex-grow">
                {topic.desc}
              </p>
              
              <div className="flex items-center justify-between w-full mt-auto pt-[16px] border-t border-[#E5DCD3]/60">
                <span className="text-[14px] font-medium text-t-muted">
                  {topic.count} articles
                </span>
                <ArrowRight className="w-[18px] h-[18px] text-t-secondary transition-transform duration-250 ease-out group-hover:translate-x-[4px] group-hover:text-rose" aria-hidden="true" />
              </div>
              
              <a
                href="#explore"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("explore");
                }}
                className="absolute inset-0 z-10"
                aria-label={`Explore ${topic.name} topics`}
              >
                <span className="sr-only">Explore {topic.name}</span>
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-[64px] text-center">
          <a
            href="#search"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("search");
            }}
            className="inline-flex items-center gap-[8px] text-t-secondary hover:text-rose font-medium transition-all group px-[24px] py-[14px] rounded-full bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-sm hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 cursor-pointer"
          >
            Can't find what you're looking for? <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform duration-250 ease-out" aria-hidden="true" /> Search Vera
          </a>
        </div>
      </div>
    </section>
  );
}

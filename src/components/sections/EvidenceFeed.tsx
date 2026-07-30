import React from "react";
import { EvidenceDNA } from "@/components/ui/EvidenceDNA";
import { ArrowRight } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

const feed = [
  {
    type: "New Evidence",
    typeColor: "bg-sage",
    finding: "Recent clinical trials confirm that sleep quality significantly impacts insulin resistance in PCOS patients.",
    strength: 4 as const,
    source: "RCTs",
    readTime: "4 min read"
  },
  {
    type: "Updated Guidance",
    typeColor: "bg-gold",
    finding: "The American College of Obstetricians and Gynecologists updated guidelines on postpartum depression screening.",
    strength: 5 as const,
    source: "Clinical Guidelines",
    readTime: "3 min read"
  },
  {
    type: "Early Research",
    typeColor: "bg-lavender",
    finding: "Initial studies link specific gut microbiome profiles to endometriosis severity, though more research is needed.",
    strength: 2 as const,
    source: "Observational",
    readTime: "5 min read"
  }
];

export function EvidenceFeed() {
  const { navigateTo } = useNavigation();

  return (
    <section id="evidence-feed-section" className="relative py-[112px] overflow-hidden bg-transparent">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="mb-[64px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary mb-[16px]">Evidence Feed</h2>
          <p className="text-[18px] text-t-secondary">The latest research and guidance on women's health.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {feed.map((item, index) => (
            <div 
              key={index} 
              onClick={() => navigateTo("article")}
              className="relative flex flex-col p-[32px] rounded-[24px] group cursor-pointer bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300"
            >
              <div className="flex items-center gap-[8px] mb-[24px]">
                <div className={`w-[8px] h-[8px] rounded-full ${item.typeColor}`} aria-hidden="true" />
                <span className="text-[14px] font-medium text-t-muted uppercase tracking-wide">{item.type}</span>
              </div>
              
              <p className="text-[18px] font-medium text-t-primary leading-[1.6] mb-[32px] flex-grow">
                {item.finding}
              </p>
              
              <div className="flex flex-col gap-[24px] mt-auto">
                <EvidenceDNA strength={item.strength} source={item.source} />
                <div className="flex items-center justify-between text-[14px] pt-[16px] border-t border-[#E5DCD3]/60">
                  <span className="text-t-muted">{item.readTime}</span>
                  <span className="flex items-center gap-[4px] text-rose font-medium">
                    Read Analysis <ArrowRight className="w-[16px] h-[16px] transition-transform group-hover:translate-x-[4px]" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <a
                href="#article"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("article");
                }}
                className="absolute inset-0 z-10"
                aria-label={`Read analysis for ${item.type}`}
              >
                <span className="sr-only">Read Analysis</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

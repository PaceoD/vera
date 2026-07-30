import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const timeline = [
  "Medical Question",
  "Research Papers",
  "Evidence Review",
  "Medical Verification",
  "Simple Explanation",
  "Published on Vera"
];

const legend = [
  { strength: 5, label: "Strong / Systematic Reviews & RCTs" },
  { strength: 4, label: "Moderate / Well-designed cohort studies" },
  { strength: 3, label: "Fair / Case-control studies" },
  { strength: 2, label: "Limited / Early Research" },
  { strength: 1, label: "Very Limited / Expert opinion" },
];

export function EditorialStandards() {
  return (
    <section className="py-[96px] bg-transparent border-t border-b border-[#E5DCD3]/50">
      <div className="w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="mb-[64px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary mb-[16px]">How we create trustworthy content</h2>
        </div>
        
        <div className="mb-[64px] overflow-x-auto pb-[24px] hide-scrollbar">
          <div className="flex items-center min-w-max">
            {timeline.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="px-[24px] py-[12px] bg-[#F8F3EE] rounded-full border border-[#E5DCD3] text-[14px] font-medium text-t-primary shadow-sm">
                  {step}
                </div>
                {index < timeline.length - 1 && (
                  <ArrowRight className="w-[16px] h-[16px] text-t-disabled mx-[16px]" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#F8F3EE]/90 backdrop-blur-md p-[32px] md:p-[48px] rounded-[24px] border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)]">
          <h3 className="text-[18px] font-semibold text-t-primary mb-[24px]">Evidence Quality Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {legend.map((item, index) => (
              <div key={index} className="flex flex-col gap-[8px]">
                <div className="flex text-sage">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn("w-[16px] h-[16px]", {
                        "fill-current": star <= item.strength,
                        "text-b-subtle stroke-current": star > item.strength,
                        "fill-transparent": star > item.strength
                      })}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-[14px] text-t-secondary">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

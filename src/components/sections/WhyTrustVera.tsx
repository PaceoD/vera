import { BookOpen, ShieldCheck, Link, AlignLeft } from "lucide-react";

const reasons = [
  { icon: BookOpen, title: "Evidence First", desc: "Every article references reliable medical research." },
  { icon: ShieldCheck, title: "Expert Reviewed", desc: "Medical content is reviewed before publication." },
  { icon: Link, title: "Sources Included", desc: "Every important claim links back to its evidence." },
  { icon: AlignLeft, title: "Plain Language", desc: "Complex science explained in simple words." },
];

export function WhyTrustVera() {
  return (
    <section id="trust-section" className="relative py-[112px] bg-transparent overflow-hidden">
      {/* Faint citation constellations vector overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" stroke="#2C2623" strokeWidth="0.8">
          <circle cx="200" cy="150" r="3" fill="#2C2623" />
          <circle cx="600" cy="120" r="4" fill="#2C2623" />
          <circle cx="400" cy="450" r="3" fill="#2C2623" />
          <line x1="200" y1="150" x2="600" y2="120" strokeDasharray="3 3" />
          <line x1="600" y1="120" x2="400" y2="450" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="text-center mb-[64px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary">Why thousands will trust Vera</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] max-w-[840px] mx-auto">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex gap-[20px] p-[28px] rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300"
            >
              <div className="shrink-0 w-[48px] h-[48px] rounded-full bg-[#FFF8F3] shadow-sm flex items-center justify-center text-sage border border-[#E5DCD3]">
                <reason.icon className="w-[24px] h-[24px] stroke-[1.5]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-t-primary mb-[8px]">{reason.title}</h3>
                <p className="text-[16px] text-t-secondary leading-[1.6]">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

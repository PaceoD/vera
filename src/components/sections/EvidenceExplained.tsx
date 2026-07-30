import { Search, UserCheck, MessageSquare } from "lucide-react";

const steps = [
  { icon: Search, title: "Research", desc: "We scan thousands of peer-reviewed clinical studies." },
  { icon: UserCheck, title: "Expert Review", desc: "Medical professionals verify the findings." },
  { icon: MessageSquare, title: "Simple Explanation", desc: "We translate complex data into plain language." },
];

export function EvidenceExplained() {
  return (
    <section id="evidence-explained-section" className="relative py-[112px] overflow-hidden bg-transparent border-t border-b border-b-subtle/50">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[32px]">
        <div className="text-center mb-[64px]">
          <h2 className="font-serif text-[40px] font-semibold text-t-primary mb-[16px]">How Vera evaluates health claims</h2>
          <p className="text-[18px] text-t-secondary">How do you decide what's true?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] relative">
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[1px] bg-b-subtle/60 -z-10" />
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-[36px] rounded-[24px] bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300"
            >
              <div className="w-[64px] h-[64px] rounded-full bg-[#FFF8F3] shadow-sm flex items-center justify-center text-rose mb-[24px] border border-[#E5DCD3]">
                <step.icon className="w-[28px] h-[28px] stroke-[1.5]" aria-hidden="true" />
              </div>
              <h3 className="text-[20px] font-semibold text-t-primary mb-[12px]">{step.title}</h3>
              <p className="text-[16px] text-t-secondary max-w-[280px] leading-[1.6]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

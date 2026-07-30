import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceDNAProps {
  strength: 1 | 2 | 3 | 4 | 5;
  source: string;
  className?: string;
}

export function EvidenceDNA({ strength, source, className }: EvidenceDNAProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-[13px] font-medium border border-[#E5DCD3] rounded-full px-4 py-1.5 bg-[#FFF8F3]/90", className)}>
      <span className="text-t-secondary">Evidence Strength</span>
      <div className="flex gap-0.5 text-sage">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("w-3.5 h-3.5", {
              "fill-current": star <= strength,
              "text-b-subtle stroke-current": star > strength,
              "fill-transparent": star > strength
            })}
          />
        ))}
      </div>
      <span className="text-b-subtle mx-1">&middot;</span>
      <span className="text-t-muted">Source Quality: <span className="text-t-primary">{source}</span></span>
    </div>
  );
}

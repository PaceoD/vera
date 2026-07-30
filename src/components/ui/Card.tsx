import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#F8F3EE]/90 backdrop-blur-md border border-[#E5DCD3] rounded-[24px] shadow-[0_6px_24px_rgba(44,38,35,0.04)] hover:bg-[#FCF8F4] hover:border-[#D6B46D]/60 hover:shadow-[0_14px_36px_rgba(44,38,35,0.08)] hover:-translate-y-[5px] transition-all duration-300",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card };

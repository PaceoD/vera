import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-canvas whitespace-nowrap",
          {
            "bg-rose text-white shadow-card hover:bg-rose-hover hover:-translate-y-[2px] hover:shadow-card-hover active:bg-rose-active disabled:bg-t-disabled disabled:text-surface disabled:hover:translate-y-0 disabled:hover:shadow-card":
              variant === "primary",
            "bg-surface text-t-primary border border-b-subtle shadow-card hover:border-rose hover:-translate-y-[2px] hover:shadow-card-hover active:bg-canvas disabled:bg-canvas disabled:text-t-disabled disabled:hover:translate-y-0 disabled:hover:shadow-card":
              variant === "secondary",
            "bg-transparent text-t-secondary hover:bg-black/5 hover:text-t-primary active:bg-black/10 disabled:text-t-disabled":
              variant === "ghost",
            "bg-transparent text-rose underline-offset-4 hover:underline hover:text-rose-hover disabled:text-t-disabled":
              variant === "link",
            "h-[36px] px-4 text-sm rounded-btn": size === "sm",
            "h-[44px] px-6 text-base rounded-btn": size === "md",
            "h-[44px] md:h-[48px] px-6 md:px-8 text-base rounded-btn": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

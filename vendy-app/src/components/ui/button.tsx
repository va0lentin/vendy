import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "brand";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" &&
            "bg-vendy-black text-white hover:bg-vendy-black/90 shadow-sm",
          variant === "brand" &&
            "bg-white text-vendy-black hover:bg-white/95 shadow-lg rounded-2xl",
          variant === "secondary" &&
            "bg-vendy-soft text-vendy-text hover:bg-vendy-border/50",
          variant === "ghost" && "text-vendy-secondary hover:text-vendy-text",
          variant === "outline" &&
            "border border-vendy-purple text-vendy-purple hover:bg-vendy-purple-soft",
          size === "sm" && "h-9 px-4 text-sm rounded-full",
          size === "md" && "h-11 px-5 text-sm rounded-full",
          size === "lg" && "h-12 px-6 text-base rounded-full w-full",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

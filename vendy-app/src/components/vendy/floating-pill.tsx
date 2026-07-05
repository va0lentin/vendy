import { cn } from "@/lib/utils";

type PillVariant = "green" | "pink" | "purple" | "black" | "white";

const VARIANTS: Record<PillVariant, string> = {
  green: "bg-vendy-green text-vendy-black",
  pink: "bg-vendy-pink text-vendy-black",
  purple: "bg-vendy-purple text-white",
  black: "bg-vendy-black text-white",
  white: "bg-white text-vendy-black",
};

interface FloatingPillProps {
  label: string;
  variant?: PillVariant;
  className?: string;
  rotate?: number;
  size?: "md" | "sm";
}

export function FloatingPill({
  label,
  variant = "green",
  className,
  rotate = -6,
  size = "md",
}: FloatingPillProps) {
  return (
    <span
      className={cn(
        "inline-block font-bold rounded-xl shadow-md",
        size === "md" && "px-4 py-2 text-sm",
        size === "sm" && "px-3 py-1.5 text-xs",
        VARIANTS[variant],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {label}
    </span>
  );
}

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, active, onClick }: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all",
        active
          ? "bg-vendy-black text-white shadow-sm"
          : "bg-vendy-surface border-2 border-vendy-border text-vendy-black hover:border-vendy-black/30",
      )}
    >
      {label}
    </button>
  );
}

interface TagPillProps {
  label: string;
  variant?: "purple" | "green" | "black";
  className?: string;
}

export function TagPill({ label, variant = "purple", className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-bold rounded-lg",
        variant === "purple" && "bg-vendy-purple text-white",
        variant === "green" && "bg-vendy-green text-vendy-black",
        variant === "black" && "bg-vendy-black text-white",
        className,
      )}
    >
      {label}
    </span>
  );
}

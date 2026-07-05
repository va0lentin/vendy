"use client";

import { cn } from "@/lib/utils";

interface CategoryChipsProps {
  categories: readonly string[];
  active: string;
  onChange: (cat: string) => void;
  className?: string;
  variant?: "default" | "onPurple";
}

export function CategoryChips({
  categories,
  active,
  onChange,
  className,
  variant = "default",
}: CategoryChipsProps) {
  const onPurple = variant === "onPurple";

  return (
    <div className={cn("flex gap-2 overflow-x-auto hide-scrollbar pb-1", className)}>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all",
            active === cat
              ? "bg-vendy-black text-white"
              : onPurple
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-vendy-soft text-vendy-black hover:bg-vendy-soft/80",
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

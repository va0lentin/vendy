"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "onPurple";
}

export function SearchBar({
  placeholder = "Rechercher une boutique, un produit...",
  className,
  value,
  onChange,
  variant = "default",
}: SearchBarProps) {
  const onPurple = variant === "onPurple";

  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className={cn(
          "flex flex-1 items-center gap-2 rounded-full px-4 py-2.5",
          onPurple ? "bg-white/95 shadow-sm" : "bg-vendy-soft",
        )}
      >
        <Search className="h-4 w-4 text-vendy-muted shrink-0" strokeWidth={1.75} />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="flex-1 bg-transparent text-sm text-vendy-text placeholder:text-vendy-muted outline-none"
        />
      </div>
      <button
        type="button"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full",
          onPurple ? "bg-white/95 shadow-sm" : "bg-vendy-soft",
        )}
        aria-label="Filtres"
      >
        <SlidersHorizontal className="h-4 w-4 text-vendy-secondary" strokeWidth={1.75} />
      </button>
    </div>
  );
}

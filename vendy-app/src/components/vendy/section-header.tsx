"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { PinkScribble } from "@/components/vendy/pink-scribble";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  expressive?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "Voir tout",
  className,
  expressive = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between mb-3", className)}>
      <div>
        {expressive ? (
          <div className="relative inline-block">
            <h2 className="font-brand text-xl text-vendy-black leading-none">{title}</h2>
            <PinkScribble className="absolute -bottom-1 left-[55%] -translate-x-1/2 w-20" />
          </div>
        ) : (
          <h2 className="font-brand text-lg text-vendy-black">{title}</h2>
        )}
        {subtitle && (
          <p className="text-xs text-vendy-muted mt-1">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link href={href} className="text-xs font-semibold text-vendy-black shrink-0">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

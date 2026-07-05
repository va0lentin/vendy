"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { TagPill } from "@/components/vendy/floating-pill";

interface FeaturedExpressiveCardProps {
  tag: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function FeaturedExpressiveCard({
  tag,
  title,
  description,
  href,
  className,
}: FeaturedExpressiveCardProps) {
  const inner = (
    <div
      className={cn(
        "rounded-vendy-3xl bg-vendy-green p-6 shadow-sm transition-transform active:scale-[0.99]",
        className,
      )}
    >
      <TagPill label={tag} variant="purple" />
      <h3 className="font-brand text-2xl text-vendy-black mt-4 leading-tight">{title}</h3>
      <p className="text-sm text-vendy-black/75 mt-2 leading-relaxed max-w-[90%]">
        {description}
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrushHighlight } from "@/components/vendy/brush-highlight";
import { FloatingPill } from "@/components/vendy/floating-pill";
import { DoodleArrow, DoodleFlower, DoodleStar } from "@/components/vendy/brand-doodles";
import { cn } from "@/lib/utils";

interface BrandHeroProps {
  ctaHref: string;
  ctaLabel?: string;
  subtitleLines?: string[];
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}

const DEFAULT_SUBTITLE = ["Prends la", "première", "étape", "avec nous."];

export function BrandHero({
  ctaHref,
  ctaLabel = "C'est parti",
  subtitleLines = DEFAULT_SUBTITLE,
  secondaryHref,
  secondaryLabel = "J'ai déjà un compte",
  className,
}: BrandHeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[780px] flex-col bg-vendy-purple text-white overflow-hidden",
        className,
      )}
    >
      {/* Calque décoratif — coins et marges uniquement */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <FloatingPill
          label="Mode"
          variant="green"
          rotate={-8}
          size="sm"
          className="absolute left-5 top-[14%]"
        />
        <FloatingPill
          label="Vintage"
          variant="black"
          rotate={-3}
          size="sm"
          className="absolute left-4 top-[26%]"
        />
        <FloatingPill
          label="Création"
          variant="white"
          rotate={6}
          size="sm"
          className="absolute right-[30%] top-[11%]"
        />
        <DoodleFlower className="absolute -right-1 top-[7%] w-24 h-24" />
        <DoodleStar className="absolute left-3 top-[42%] w-12 h-12" />
        <FloatingPill
          label="Artisanat"
          variant="green"
          rotate={10}
          size="sm"
          className="absolute right-6 top-[58%]"
        />
        <DoodleArrow className="absolute right-8 bottom-[19%] w-9 h-14 rotate-[15deg]" />
      </div>

      {/* Texte principal — zone sûre au centre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative z-10 flex flex-1 items-center px-7 pt-28 pb-36"
      >
        <h1 className="font-brand text-[2.45rem] leading-[1.06] tracking-tight text-white max-w-[85%]">
          <span className="block">Crée,</span>
          <span className="block">partage,</span>
          <span className="block mt-1">
            <BrushHighlight>vends.</BrushHighlight>
          </span>
          {subtitleLines.map((line, i) => (
            <span key={line} className={cn("block", i === 0 ? "mt-5" : "mt-1")}>
              {line}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* CTA bas */}
      <div className="relative z-10 shrink-0 px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link
            href={ctaHref}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-white text-vendy-black text-lg font-bold transition-transform active:scale-[0.98] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            {ctaLabel}
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="mt-4 block text-center text-sm font-medium text-white/85 underline-offset-2 hover:underline"
            >
              {secondaryLabel}
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}

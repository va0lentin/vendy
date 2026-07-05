"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrushHighlight } from "@/components/vendy/brush-highlight";
import { FloatingPill } from "@/components/vendy/floating-pill";
import { DoodleFlower, DoodleStar } from "@/components/vendy/brand-doodles";
import { cn } from "@/lib/utils";

interface BrandGreetingSplashProps {
  firstName: string;
  onComplete?: () => void;
  durationMs?: number;
  className?: string;
}

export function BrandGreetingSplash({
  firstName,
  onComplete,
  durationMs = 2800,
  className,
}: BrandGreetingSplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / durationMs) * 100));
    }, 40);

    const done = window.setTimeout(() => {
      onComplete?.();
    }, durationMs);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
    };
  }, [durationMs, onComplete]);

  return (
    <div
      className={cn(
        "relative flex min-h-[780px] flex-col bg-vendy-purple text-white overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <FloatingPill
          label="Mode"
          variant="green"
          rotate={-8}
          size="sm"
          className="absolute left-5 top-[14%]"
        />
        <DoodleFlower className="absolute -right-1 top-[7%] w-24 h-24" />
        <DoodleStar className="absolute left-3 top-[42%] w-12 h-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-1 items-center px-7 pt-28 pb-40"
      >
        <h1 className="font-brand text-[2.45rem] leading-[1.06] tracking-tight text-white max-w-[85%]">
          <span className="block">Bonjour,</span>
          <span className="block mt-3">
            <BrushHighlight>{firstName}.</BrushHighlight>
          </span>
          <span className="block mt-5 text-white/85 text-[1.65rem] leading-snug">
            Content de te revoir.
          </span>
        </h1>
      </motion.div>

      <div className="relative z-10 shrink-0 px-6 pb-10">
        <div className="mb-6 space-y-3">
          <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-white"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="font-brand text-3xl text-white text-center tracking-tight"
        >
          Vendy
        </motion.p>
      </div>
    </div>
  );
}

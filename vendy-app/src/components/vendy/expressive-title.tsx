"use client";

import { cn } from "@/lib/utils";
import { PinkScribble } from "@/components/vendy/pink-scribble";

interface ExpressiveTitleProps {
  title: string;
  scribble?: boolean;
  className?: string;
  size?: "lg" | "xl";
}

export function ExpressiveTitle({
  title,
  scribble = true,
  className,
  size = "xl",
}: ExpressiveTitleProps) {
  return (
    <div className={cn("relative", className)}>
      <h2
        className={cn(
          "font-brand text-vendy-black leading-none",
          size === "xl" && "text-[2rem]",
          size === "lg" && "text-xl",
        )}
      >
        {title}
      </h2>
      {scribble && (
        <PinkScribble className="absolute -bottom-1 left-[45%] -translate-x-1/2" />
      )}
    </div>
  );
}

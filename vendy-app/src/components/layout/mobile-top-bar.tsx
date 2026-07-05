"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileTopBarProps {
  title?: string;
  backHref?: string;
  right?: React.ReactNode;
  className?: string;
}

export function MobileTopBar({
  title,
  backHref,
  right,
  className,
}: MobileTopBarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-vendy-bg/90 backdrop-blur-md border-b border-vendy-border/50",
        className,
      )}
    >
      <div className="w-10">
        {backHref && (
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-vendy-soft"
          >
            <ArrowLeft className="h-5 w-5 text-vendy-text" strokeWidth={1.75} />
          </Link>
        )}
      </div>
      {title && (
        <h1 className="text-base font-semibold text-vendy-text">{title}</h1>
      )}
      <div className="w-10 flex justify-end">{right}</div>
    </div>
  );
}

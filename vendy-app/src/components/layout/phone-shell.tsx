"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneShell({
  children,
  theme = "default",
}: {
  children: ReactNode;
  theme?: "default" | "brand";
}) {
  return (
    <div className="min-h-screen bg-[#ebe8e4] flex items-start justify-center py-8 px-4">
      <div
        className={cn(
          "relative w-full max-w-[430px] min-h-[844px] rounded-[2.5rem] shadow-vendy-lg border border-vendy-border/40 overflow-hidden",
          theme === "brand" ? "bg-vendy-purple" : "bg-vendy-bg",
        )}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black/90 rounded-b-2xl z-50" />
        <div className="relative h-full min-h-full overflow-y-auto overflow-x-hidden pb-28">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-4 pt-12 pb-4", className)}>{children}</div>
  );
}

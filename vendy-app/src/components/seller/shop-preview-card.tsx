"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import type { ShopDraft } from "@/types/vendy";
import type { Shop } from "@/types/vendy";
import { cn } from "@/lib/utils";

type PreviewShop = Pick<
  Shop,
  "name" | "description" | "coverImage" | "logoImage" | "accentColor" | "theme" | "rating" | "sales" | "followers"
>;

interface ShopPreviewCardProps {
  shop: PreviewShop | ShopDraft;
  slug?: string;
  className?: string;
  compact?: boolean;
}

export function ShopPreviewCard({
  shop,
  slug = "ma-boutique",
  className,
  compact = false,
}: ShopPreviewCardProps) {
  const isDark = shop.theme === "dark";
  const name = shop.name || "Ma boutique";
  const description =
    shop.description || "Ta description apparaîtra ici.";

  return (
    <motion.div
      layout
      className={cn(
        "rounded-vendy-xl overflow-hidden border shadow-vendy",
        isDark ? "bg-[#1a1a1a] border-white/10" : "bg-vendy-surface border-vendy-border/80",
        className,
      )}
    >
      <div className={cn("relative", compact ? "h-24" : "h-32")}>
        <Image
          src={shop.coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="400px"
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(135deg, ${shop.accentColor}, transparent)` }}
        />
      </div>

      <div className={cn("px-4 pb-4", compact ? "-mt-5" : "-mt-6")}>
        <div
          className={cn(
            "relative rounded-full overflow-hidden border-4 shadow-md mb-2",
            compact ? "h-10 w-10" : "h-12 w-12",
            isDark ? "border-[#1a1a1a]" : "border-vendy-bg",
          )}
        >
          <Image src={shop.logoImage} alt="" fill className="object-cover" sizes="48px" />
        </div>

        <p
          className={cn(
            "font-semibold",
            compact ? "text-sm" : "text-base",
            isDark ? "text-white" : "text-vendy-text",
          )}
        >
          {name}
        </p>

        {!compact && (
          <>
            <p
              className={cn(
                "text-xs mt-1 line-clamp-2 leading-relaxed",
                isDark ? "text-white/60" : "text-vendy-secondary",
              )}
            >
              {description}
            </p>
            <div
              className="flex items-center gap-1.5 mt-2 py-1.5 px-2 rounded-vendy-lg text-[10px]"
              style={{
                backgroundColor: `${shop.accentColor}15`,
                color: shop.accentColor,
              }}
            >
              <Shield className="h-3 w-3 shrink-0" strokeWidth={1.75} />
              Achats protégés par Vendy
            </div>
            <p
              className={cn(
                "text-[10px] mt-2 font-mono",
                isDark ? "text-white/40" : "text-vendy-muted",
              )}
            >
              vendy.app/{slug || "ma-boutique"}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

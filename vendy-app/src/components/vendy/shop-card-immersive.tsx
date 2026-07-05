"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Shop } from "@/types/vendy";

interface ShopCardImmersiveProps {
  shop: Shop;
  className?: string;
}

export function ShopCardImmersive({ shop, className }: ShopCardImmersiveProps) {
  return (
    <Link
      href={`/s/${shop.slug}`}
      className={cn(
        "relative block shrink-0 w-[300px] h-[380px] rounded-vendy-xl overflow-hidden shadow-vendy-lg group",
        className,
      )}
    >
      <Image
        src={shop.coverImage}
        alt={shop.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="300px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
        aria-label="Suivre"
      >
        <Heart className="h-4 w-4 text-white" strokeWidth={1.75} />
      </button>
      <div className="absolute bottom-20 left-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image src={shop.logoImage} alt="" fill className="object-cover" sizes="48px" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-0">
        <p className="text-xs text-white/70 mb-0.5">
          {shop.category} · {shop.location.split(",")[0]}
        </p>
        <h3 className="text-xl font-semibold text-white leading-tight mb-2">
          {shop.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-white bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
            ★ {shop.rating}
          </span>
          <span className="text-xs text-white/70">
            {(shop.followers / 1000).toFixed(1).replace(".0", "")}k abonnés
          </span>
        </div>
        <div className="flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md px-4 py-2.5">
          <span className="text-sm text-white/90">Voir la boutique</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <ArrowRight className="h-4 w-4 text-vendy-text" />
          </span>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/vendy";
import { getShop } from "@/lib/mock/data";

interface ProductCardImmersiveProps {
  product: Product;
  className?: string;
}

export function ProductCardImmersive({
  product,
  className,
}: ProductCardImmersiveProps) {
  const shop = getShop(product.shopId);

  return (
    <motion.div whileTap={{ scale: 0.98 }} className={cn("shrink-0", className?.includes("w-full") && "w-full")}>
    <Link
      href={`/p/${product.id}`}
      className={cn(
        "relative block shrink-0 w-[280px] h-[360px] rounded-vendy-xl overflow-hidden shadow-vendy-lg group",
        className,
      )}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="280px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
        aria-label="Sauvegarder"
      >
        <Heart className="h-4 w-4 text-white" strokeWidth={1.75} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-xs text-white/70 mb-0.5">{shop?.name}</p>
        <h3 className="text-lg font-semibold text-white leading-tight mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-white bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5">
            ★ {product.rating}
          </span>
          <span className="text-sm font-semibold text-white">{product.price} €</span>
        </div>
        <div className="flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md px-4 py-2.5">
          <span className="text-sm text-white/90">Voir le produit</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <ArrowRight className="h-4 w-4 text-vendy-text" />
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

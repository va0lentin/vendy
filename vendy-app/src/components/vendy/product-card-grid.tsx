"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/vendy";

interface ProductCardGridProps {
  product: Product;
  className?: string;
}

export function ProductCardGrid({ product, className }: ProductCardGridProps) {
  return (
    <Link href={`/p/${product.id}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/4] rounded-vendy-2xl overflow-hidden bg-vendy-soft shadow-vendy mb-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 430px) 50vw, 200px"
        />
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-vendy-surface/90 shadow-sm"
          aria-label="Sauvegarder"
        >
          <Heart className="h-3.5 w-3.5 text-vendy-muted" strokeWidth={1.75} />
        </button>
      </div>
      <p className="text-sm font-semibold text-vendy-black">{product.name}</p>
      <p className="text-sm font-bold text-vendy-black">{product.price} €</p>
    </Link>
  );
}

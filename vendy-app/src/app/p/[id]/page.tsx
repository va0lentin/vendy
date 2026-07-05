"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { PhoneShell } from "@/components/layout/phone-shell";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { getProduct, getShop } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) return <div>Produit introuvable</div>;
  const shop = getShop(product.shopId)!;

  return (
    <PhoneShell>
      <div className="relative h-[420px]">
        <Image src={product.image} alt={product.name} fill className="object-cover" priority sizes="430px" />
        <div className="absolute top-12 left-4 right-4 flex justify-between">
          <Link href="/discover" className="flex h-10 w-10 items-center justify-center rounded-full bg-vendy-surface/90 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-vendy-surface/90 backdrop-blur-sm">
              <Share2 className="h-4 w-4" />
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-vendy-surface/90 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4 -mt-4 relative bg-vendy-bg rounded-t-vendy-xl">
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-1">{product.price} €</p>
        </div>

        <Link href={`/s/${shop.slug}`} className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image src={shop.logoImage} alt="" fill className="object-cover" sizes="40px" />
          </div>
          <div>
            <p className="text-sm font-medium">{shop.name}</p>
            <p className="text-xs text-vendy-muted">★ {shop.rating} · {shop.badge}</p>
          </div>
        </Link>

        <p className="text-sm text-vendy-secondary leading-relaxed">{product.description}</p>

        {product.size && (
          <div className="flex gap-2">
            {["S", "M", "L"].map((s) => (
              <button
                key={s}
                type="button"
                className={cn(
                  "h-10 w-10 rounded-vendy border text-sm font-medium",
                  s === product.size
                    ? "border-vendy-coral bg-vendy-coral-soft text-vendy-coral"
                    : "border-vendy-border text-vendy-secondary",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <TrustLine variant="inline" />

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-vendy-bg/95 backdrop-blur-md border-t border-vendy-border/50 flex gap-2">
          <Link href={`/checkout/${product.id}`} className="flex-1">
            <Button size="lg">Acheter maintenant</Button>
          </Link>
          <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-vendy-border">
            <Heart className="h-5 w-5 text-vendy-coral" />
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

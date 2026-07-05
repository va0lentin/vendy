"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Shield } from "lucide-react";
import { PhoneShell } from "@/components/layout/phone-shell";
import { ProductCardGrid } from "@/components/vendy/product-card-grid";
import { Button } from "@/components/ui/button";
import { SHOPS, getShopProducts } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const TABS = ["Collections", "Nouveautés", "Avis"] as const;

export default function ShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const shop = SHOPS.find((s) => s.slug === slug);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Collections");

  if (!shop) {
    return (
      <PhoneShell>
        <div className="p-8 text-center text-vendy-secondary">Boutique introuvable</div>
      </PhoneShell>
    );
  }

  const products = getShopProducts(shop.id);

  return (
    <PhoneShell>
      <div className="relative h-56">
        <Image src={shop.coverImage} alt="" fill className="object-cover" sizes="430px" />
        <div className="absolute top-12 left-4 right-4 flex justify-between">
          <Link href="/discover" className="flex h-10 w-10 items-center justify-center rounded-full bg-vendy-surface/90 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-vendy-surface/90 backdrop-blur-sm">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 -mt-8 relative">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-vendy-bg shadow-md mb-3">
          <Image src={shop.logoImage} alt="" fill className="object-cover" sizes="64px" />
        </div>

        <h1 className="text-xl font-semibold">{shop.name}</h1>
        {shop.verified && (
          <span className="inline-flex items-center gap-1 text-xs text-vendy-coral font-medium mt-1">
            <Shield className="h-3 w-3" /> Boutique vérifiée
          </span>
        )}
        <p className="text-sm text-vendy-secondary mt-2 leading-relaxed">{shop.description}</p>
        <p className="text-xs text-vendy-muted mt-2">
          ★ {shop.rating} · {shop.sales} ventes · {(shop.followers / 1000).toFixed(1)}k abonnés
        </p>

        <div className="flex items-center gap-1.5 mt-3 py-2 px-3 rounded-vendy-lg bg-vendy-coral-soft/60 border border-vendy-coral/10">
          <Shield className="h-3.5 w-3.5 text-vendy-coral shrink-0" strokeWidth={1.75} />
          <p className="text-[11px] text-vendy-secondary leading-snug">
            Achats protégés par Vendy · paiement sécurisé · envoi suivi
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            Suivre
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-4 mt-6 border-b border-vendy-border">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "pb-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                tab === t
                  ? "border-vendy-coral text-vendy-coral"
                  : "border-transparent text-vendy-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="py-5 pb-24">
          <p className="text-sm font-semibold mb-3">Nouveau drop</p>
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <ProductCardGrid key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

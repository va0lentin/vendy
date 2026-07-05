"use client";

import Link from "next/link";
import { Copy, Share2 } from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { ExpressiveTitle } from "@/components/vendy/expressive-title";
import { FeaturedExpressiveCard } from "@/components/vendy/featured-expressive-card";
import { DoodleStar } from "@/components/vendy/brand-doodles";
import { ShopPreviewCard } from "@/components/seller/shop-preview-card";
import { useActiveShop, useVendy } from "@/lib/context/vendy-provider";
import { useState } from "react";

export default function SellReadyPage() {
  const shop = useActiveShop();
  const { setRole } = useVendy();
  const [copied, setCopied] = useState(false);
  const shopLink = `vendy.app/s/${shop.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shopLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageContainer className="space-y-6 py-4">
      <div className="flex flex-col items-center pt-2">
        <DoodleStar className="mb-4" />
        <ExpressiveTitle title="C'est prêt !" className="text-center" />
        <p className="text-sm text-vendy-secondary text-center mt-3 max-w-xs">
          Partage ton lien et commence à recevoir des commandes sécurisées.
        </p>
      </div>

      <FeaturedExpressiveCard
        tag={shop.category}
        title={shop.name}
        description={shop.description}
      />

      <ShopPreviewCard shop={shop} slug={shop.slug} />

        <div className="rounded-vendy-2xl bg-vendy-soft px-4 py-3 flex items-center justify-between gap-2">
        <span className="text-sm font-mono text-vendy-black truncate">{shopLink}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-vendy-black text-white text-xs font-bold"
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-vendy-soft font-bold text-sm"
        >
          <Copy className="h-4 w-4" />
          Copier
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-vendy-soft font-bold text-sm"
        >
          <Share2 className="h-4 w-4" />
          Partager
        </button>
      </div>

      <div className="space-y-3 pt-2">
        <Link
          href="/seller/products/new"
          onClick={() => setRole("seller")}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-vendy-black text-white font-bold transition-transform active:scale-[0.98]"
        >
          Ajouter mon premier produit
        </Link>
        <Link
          href="/profile"
          onClick={() => setRole("seller")}
          className="flex h-12 w-full items-center justify-center rounded-2xl font-bold text-sm text-vendy-secondary"
        >
          Voir mon profil vendeur
        </Link>
      </div>
    </PageContainer>
  );
}

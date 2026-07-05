"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { EncouragementBanner } from "@/components/vendy/encouragement-banner";
import { useVendy } from "@/lib/context/vendy-provider";
import { CATEGORIES } from "@/lib/mock/data";
import type { ShopCategory } from "@/types/vendy";
import { cn } from "@/lib/utils";

export default function SellSetupPage() {
  const router = useRouter();
  const { shopDraft, updateShopDraft } = useVendy();
  const [touched, setTouched] = useState(false);

  const canContinue = shopDraft.name.trim().length >= 2 && shopDraft.description.trim().length >= 10;

  const handleContinue = () => {
    setTouched(true);
    if (!canContinue) return;
    router.push("/sell/customize");
  };

  return (
    <>
      <MobileTopBar backHref="/sell" title="Créer ma boutique" />
      <PageContainer className="space-y-5">
        <EncouragementBanner message="Plus qu'une étape avant la personnalisation" />

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Nom de la boutique</span>
            <input
              type="text"
              value={shopDraft.name}
              onChange={(e) => updateShopDraft({ name: e.target.value })}
              placeholder="Ex. Lina Studio"
              className="w-full h-11 px-4 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Description courte</span>
            <textarea
              value={shopDraft.description}
              onChange={(e) => updateShopDraft({ description: e.target.value })}
              placeholder="Décris ta boutique en une ou deux phrases..."
              rows={3}
              className="w-full px-4 py-3 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
            />
          </label>

          <div className="space-y-1.5">
            <span className="text-sm font-medium">Catégorie</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c !== "Tout").map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateShopDraft({ category: cat as ShopCategory })}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    shopDraft.category === cat
                      ? "bg-vendy-coral text-white border-vendy-coral"
                      : "bg-vendy-surface border-vendy-border text-vendy-secondary",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium">
              Localisation <span className="text-vendy-muted font-normal">(optionnel)</span>
            </span>
            <input
              type="text"
              value={shopDraft.location}
              onChange={(e) => updateShopDraft({ location: e.target.value })}
              placeholder="Paris, France"
              className="w-full h-11 px-4 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium">
              Instagram <span className="text-vendy-muted font-normal">(optionnel)</span>
            </span>
            <input
              type="text"
              value={shopDraft.instagram}
              onChange={(e) => updateShopDraft({ instagram: e.target.value })}
              placeholder="@maboutique"
              className="w-full h-11 px-4 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
            />
          </label>
        </div>

        {touched && !canContinue && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-vendy-coral"
          >
            Nom (2 car. min.) et description (10 car. min.) requis.
          </motion.p>
        )}

        <Button size="lg" onClick={handleContinue}>
          Personnaliser ma boutique
        </Button>
      </PageContainer>
    </>
  );
}

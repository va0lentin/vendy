"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { EncouragementBanner } from "@/components/vendy/encouragement-banner";
import { ShopPreviewCard } from "@/components/seller/shop-preview-card";
import { useVendy } from "@/lib/context/vendy-provider";
import { SHOP_PRESETS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = ["#F04465", "#B45309", "#059669", "#7C3AED", "#2563EB", "#1F1F1F"];

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "ma-boutique";
}

export default function SellCustomizePage() {
  const router = useRouter();
  const { shopDraft, updateShopDraft, createShopFromDraft } = useVendy();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleFinish = () => {
    createShopFromDraft();
    router.push("/sell/ready");
  };

  return (
    <>
      <MobileTopBar backHref="/sell/setup" title="Personnaliser" />
      <PageContainer className="space-y-5">
        <EncouragementBanner message="C'est presque fini — aperçu en direct" visible />

        <ShopPreviewCard shop={shopDraft} slug={slugify(shopDraft.name)} />

        <section className="space-y-3">
          <p className="text-sm font-semibold">Style prédéfini</p>
          <div className="grid grid-cols-2 gap-2">
            {SHOP_PRESETS.map((preset) => (
              <motion.button
                key={preset.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  updateShopDraft({
                    coverImage: preset.coverImage,
                    logoImage: preset.logoImage,
                    accentColor: preset.accentColor,
                    theme: preset.theme,
                  })
                }
                className={cn(
                  "rounded-vendy-lg border p-3 text-left transition-all",
                  shopDraft.coverImage === preset.coverImage
                    ? "border-vendy-coral ring-2 ring-vendy-coral/20 bg-vendy-coral-soft/30"
                    : "border-vendy-border/80 bg-vendy-surface",
                )}
              >
                <div
                  className="h-10 rounded-vendy mb-2 bg-cover bg-center"
                  style={{ backgroundImage: `url(${preset.coverImage})` }}
                />
                <p className="text-xs font-medium">{preset.name}</p>
                <div
                  className="h-2 w-2 rounded-full mt-1"
                  style={{ backgroundColor: preset.accentColor }}
                />
              </motion.button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex items-center justify-between w-full py-2 text-sm font-medium text-vendy-text"
        >
          Options avancées
          {advancedOpen ? (
            <ChevronUp className="h-4 w-4 text-vendy-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-vendy-muted" />
          )}
        </button>

        {advancedOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4 overflow-hidden"
          >
            <div className="space-y-2">
              <p className="text-xs font-medium text-vendy-secondary">Couleur d'accent</p>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => updateShopDraft({ accentColor: color })}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-transform active:scale-95",
                      shopDraft.accentColor === color
                        ? "border-vendy-text scale-110"
                        : "border-transparent",
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-vendy-secondary">Thème</p>
              <div className="flex gap-2">
                {(["light", "dark"] as const).map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => updateShopDraft({ theme })}
                    className={cn(
                      "flex-1 py-2 rounded-vendy-lg text-xs font-medium border",
                      shopDraft.theme === theme
                        ? "border-vendy-coral bg-vendy-coral-soft text-vendy-coral"
                        : "border-vendy-border text-vendy-secondary",
                    )}
                  >
                    {theme === "light" ? "Clair" : "Sombre"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <Button size="lg" onClick={handleFinish}>
          Créer ma boutique
        </Button>
      </PageContainer>
    </>
  );
}

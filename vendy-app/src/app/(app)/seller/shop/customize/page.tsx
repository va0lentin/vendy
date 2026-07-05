"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { ShopPreviewCard } from "@/components/seller/shop-preview-card";
import { useActiveShop, useVendy } from "@/lib/context/vendy-provider";
import { SHOP_PRESETS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = ["#F04465", "#B45309", "#059669", "#7C3AED", "#2563EB", "#1F1F1F"];

export default function ShopCustomizePage() {
  const shop = useActiveShop();
  const { updateShopCustomization } = useVendy();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const applyPreset = (preset: (typeof SHOP_PRESETS)[0]) => {
    updateShopCustomization(shop.id, {
      coverImage: preset.coverImage,
      logoImage: preset.logoImage,
      accentColor: preset.accentColor,
      theme: preset.theme,
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <MobileTopBar backHref="/seller/shop" title="Personnaliser" />
      <PageContainer className="space-y-5">
        <ShopPreviewCard shop={shop} slug={shop.slug} />

        <section className="space-y-3">
          <p className="text-sm font-semibold">Presets</p>
          <div className="grid grid-cols-2 gap-2">
            {SHOP_PRESETS.map((preset) => (
              <motion.button
                key={preset.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => applyPreset(preset)}
                className={cn(
                  "rounded-vendy-lg border p-3 text-left",
                  shop.coverImage === preset.coverImage
                    ? "border-vendy-coral ring-2 ring-vendy-coral/20"
                    : "border-vendy-border/80 bg-vendy-surface",
                )}
              >
                <div
                  className="h-10 rounded-vendy mb-2 bg-cover bg-center"
                  style={{ backgroundImage: `url(${preset.coverImage})` }}
                />
                <p className="text-xs font-medium">{preset.name}</p>
              </motion.button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex items-center justify-between w-full py-2 text-sm font-medium"
        >
          Panneau avancé
          {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {advancedOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex gap-2 flex-wrap">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    updateShopCustomization(shop.id, { accentColor: color });
                    setSaved(false);
                  }}
                  className={cn(
                    "h-8 w-8 rounded-full border-2",
                    shop.accentColor === color ? "border-vendy-text" : "border-transparent",
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {(["light", "dark"] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => {
                    updateShopCustomization(shop.id, { theme });
                    setSaved(false);
                  }}
                  className={cn(
                    "flex-1 py-2 rounded-vendy-lg text-xs font-medium border",
                    (shop.theme ?? "light") === theme
                      ? "border-vendy-coral bg-vendy-coral-soft text-vendy-coral"
                      : "border-vendy-border",
                  )}
                >
                  {theme === "light" ? "Clair" : "Sombre"}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <Button size="lg" onClick={handleSave}>
          {saved ? "Enregistré ✓" : "Enregistrer"}
        </Button>
      </PageContainer>
    </>
  );
}

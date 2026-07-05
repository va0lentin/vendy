"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { EncouragementBanner } from "@/components/vendy/encouragement-banner";
import { SHIPPING_CATEGORIES } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState<string>("medium");
  const [description, setDescription] = useState("");

  const canPublish = name.trim().length >= 2 && Number(price) > 0;

  return (
    <>
      <MobileTopBar backHref="/seller/products" title="Nouveau produit" />
      <PageContainer className="space-y-5">
        <EncouragementBanner message="Ton produit sera prêt à vendre en un clic" />

        <div className="rounded-vendy-xl border-2 border-dashed border-vendy-border bg-vendy-soft/50 h-40 flex flex-col items-center justify-center text-vendy-muted">
          <span className="text-3xl mb-2">📷</span>
          <p className="text-xs">Ajouter des photos</p>
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Nom du produit</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Sweat oversized"
            className="w-full h-11 px-4 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Prix (€)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="64"
            className="w-full h-11 px-4 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
          />
        </label>

        <div className="space-y-2">
          <span className="text-sm font-medium">Catégorie d'expédition</span>
          {SHIPPING_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setShipping(cat.id)}
              className={cn(
                "w-full flex items-center justify-between rounded-vendy-lg border p-3 text-left transition-colors",
                shipping === cat.id
                  ? "border-vendy-coral bg-vendy-coral-soft/40"
                  : "border-vendy-border/80 bg-vendy-surface",
              )}
            >
              <div>
                <p className="text-sm font-medium">{cat.label}</p>
                <p className="text-xs text-vendy-muted">{cat.hint}</p>
              </div>
              <span className="text-xs font-mono text-vendy-secondary">{cat.weight}</span>
            </motion.button>
          ))}
        </div>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Décris ton article..."
            className="w-full px-4 py-3 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
          />
        </label>

        <Button
          size="lg"
          disabled={!canPublish}
          onClick={() => router.push("/seller/products/ready")}
        >
          Publier le produit
        </Button>
      </PageContainer>
    </>
  );
}

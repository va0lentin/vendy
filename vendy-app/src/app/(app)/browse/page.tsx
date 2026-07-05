"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/phone-shell";
import { CategoryChips } from "@/components/vendy/category-chips";
import { ProductCardGrid } from "@/components/vendy/product-card-grid";
import { SearchBar } from "@/components/vendy/search-bar";
import { SectionHeader } from "@/components/vendy/section-header";
import { ShopCardImmersive } from "@/components/vendy/shop-card-immersive";
import { CATEGORIES, PRODUCTS, SHOPS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const TABS = ["Produits", "Boutiques"] as const;

export default function BrowsePage() {
  const [category, setCategory] = useState("Tout");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Produits");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let list = category === "Tout" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [category, query]);

  const filteredShops = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return SHOPS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }
    return category === "Tout"
      ? SHOPS
      : SHOPS.filter((s) => s.category === category);
  }, [category, query]);

  return (
    <PageContainer className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-vendy-text mb-4">Parcourir</h1>
        <SearchBar
          placeholder="Rechercher une boutique, un produit..."
          value={query}
          onChange={setQuery}
        />
        <CategoryChips
          categories={CATEGORIES}
          active={category}
          onChange={setCategory}
          className="mt-3"
        />
      </div>

      <div className="flex gap-4 border-b border-vendy-border">
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

      {tab === "Produits" ? (
        <section>
          <SectionHeader
            title={`${filteredProducts.length} produit${filteredProducts.length > 1 ? "s" : ""}`}
          />
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCardGrid key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-sm text-vendy-muted py-12">
              Aucun produit trouvé
            </p>
          )}
        </section>
      ) : (
        <section>
          <SectionHeader
            title={`${filteredShops.length} boutique${filteredShops.length > 1 ? "s" : ""}`}
          />
          <div className="flex flex-col gap-4">
            {filteredShops.map((shop) => (
              <ShopCardImmersive
                key={shop.id}
                shop={shop}
                className="w-full max-w-none h-[320px]"
              />
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}

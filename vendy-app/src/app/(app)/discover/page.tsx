"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/phone-shell";
import { CategoryChips } from "@/components/vendy/category-chips";
import { ProductCardGrid } from "@/components/vendy/product-card-grid";
import { ProductCardImmersive } from "@/components/vendy/product-card-immersive";
import { SearchBar } from "@/components/vendy/search-bar";
import { SectionHeader } from "@/components/vendy/section-header";
import { ShopCardImmersive } from "@/components/vendy/shop-card-immersive";
import { CATEGORIES, PRODUCTS, SHOPS } from "@/lib/mock/data";
import type { Product } from "@/types/vendy";

function buildArticleFeed(products: Product[], repeats = 3): Product[] {
  if (products.length === 0) return [];
  const feed: Product[] = [];
  for (let i = 0; i < repeats; i++) {
    products.forEach((p) => {
      feed.push({ ...p, id: i === 0 ? p.id : `${p.id}-feed-${i}` });
    });
  }
  return feed;
}

export default function DiscoverPage() {
  const [category, setCategory] = useState("Tout");
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

  const forYouProducts = useMemo(() => {
    const base = filteredProducts.length > 0 ? filteredProducts : PRODUCTS;
    return base.slice(0, 5);
  }, [filteredProducts]);

  const articleFeed = useMemo(
    () => buildArticleFeed(filteredProducts.length > 0 ? filteredProducts : PRODUCTS, 3),
    [filteredProducts],
  );

  return (
    <PageContainer className="space-y-6">
      <div className="-mx-4 -mt-12 px-4 pt-12 pb-5 bg-vendy-purple rounded-b-vendy-3xl">
        <SearchBar value={query} onChange={setQuery} variant="onPurple" />
        <CategoryChips
          categories={CATEGORIES}
          active={category}
          onChange={setCategory}
          variant="onPurple"
          className="mt-3"
        />
      </div>

      <section>
        <SectionHeader
          title="Pour toi"
          subtitle="Recommandé selon vos goûts"
          expressive
        />
        <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {forYouProducts.map((product) => (
            <ProductCardImmersive key={`foryou-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Articles" subtitle="Faites défiler pour en voir plus" />
        <div className="grid grid-cols-2 gap-4">
          {articleFeed.map((product) => {
            const realId = product.id.includes("-feed-")
              ? product.id.split("-feed-")[0]
              : product.id;
            const realProduct = PRODUCTS.find((p) => p.id === realId) ?? product;
            return (
              <ProductCardGrid
                key={product.id}
                product={{ ...realProduct, id: realId }}
              />
            );
          })}
        </div>
        {articleFeed.length === 0 && (
          <p className="text-center text-sm text-vendy-muted py-12">
            Aucun article trouvé
          </p>
        )}
      </section>

      <section className="pt-2 pb-4">
        <SectionHeader
          title="Boutiques à découvrir"
          subtitle="Sélectionnées pour vous"
          href="/browse?tab=boutiques"
        />
        <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
          {SHOPS.map((shop) => (
            <ShopCardImmersive key={shop.id} shop={shop} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

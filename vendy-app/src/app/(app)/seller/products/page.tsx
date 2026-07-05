"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { ProductCardGrid } from "@/components/vendy/product-card-grid";
import { EmptyState } from "@/components/vendy/empty-state";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/mock/data";
import { useActiveShop } from "@/lib/context/vendy-provider";

export default function SellerProductsPage() {
  const shop = useActiveShop();
  const products = PRODUCTS.filter((p) => p.shopId === shop.id);

  return (
    <>
      <MobileTopBar backHref="/profile" title="Produits" />
      <PageContainer className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-vendy-secondary">{products.length} article(s)</p>
          <Link href="/seller/products/new">
            <Button size="sm">Ajouter</Button>
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <ProductCardGrid key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            emoji="📦"
            title="Aucun produit"
            description="Publiez votre premier article pour commencer à vendre."
            actionLabel="Ajouter un produit"
            actionHref="/seller/products/new"
          />
        )}
      </PageContainer>
    </>
  );
}

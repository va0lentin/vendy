"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { ShopPreviewCard } from "@/components/seller/shop-preview-card";
import { Button } from "@/components/ui/button";
import { useActiveShop } from "@/lib/context/vendy-provider";

export default function SellerShopPage() {
  const shop = useActiveShop();

  return (
    <>
      <MobileTopBar backHref="/profile" title="Ma boutique" />
      <PageContainer className="space-y-5">
        <ShopPreviewCard shop={shop} slug={shop.slug} />

        <p className="text-sm text-vendy-secondary leading-relaxed">{shop.description}</p>

        <div className="grid grid-cols-2 gap-2">
          <Link href={`/s/${shop.slug}`}>
            <Button variant="outline" size="md" className="w-full">
              Voir en public
            </Button>
          </Link>
          <Link href="/seller/shop/customize">
            <Button variant="secondary" size="md" className="w-full">
              Personnaliser
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-vendy-lg bg-vendy-soft border border-vendy-border/60 p-4 text-center"
        >
          <p className="text-xs text-vendy-muted font-mono">vendy.app/s/{shop.slug}</p>
        </motion.div>
      </PageContainer>
    </>
  );
}

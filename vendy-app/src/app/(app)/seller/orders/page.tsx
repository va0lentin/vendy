"use client";

import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { getProduct } from "@/lib/mock/data";
import { useVendy } from "@/lib/context/vendy-provider";

export default function SellerOrdersPage() {
  const { order } = useVendy();
  const product = getProduct(order.productId)!;

  return (
    <>
      <MobileTopBar title="Commandes vendeur" />
      <PageContainer className="space-y-4">
        <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm">
          <div className="flex gap-3 mb-4">
            <div className="relative h-16 w-16 rounded-vendy overflow-hidden">
              <Image src={product.image} alt="" fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-vendy-secondary">{order.buyerName}</p>
              <p className="text-sm font-semibold text-vendy-coral mt-1">{order.total} €</p>
            </div>
          </div>
          <Link href="/seller/shipping">
            <Button size="md" className="w-full">
              Expédier la commande
            </Button>
          </Link>
        </div>
        <TrustLine variant="compact" />
      </PageContainer>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { VendyFlow } from "@/components/vendy/vendy-flow";
import { TrustLine } from "@/components/vendy/trust-line";
import { Button } from "@/components/ui/button";
import { BUYER_FLOW_STEPS, orderStatusToFlowIndex } from "@/lib/flow-steps";
import { useVendy } from "@/lib/context/vendy-provider";
import { getProduct, getShop } from "@/lib/mock/data";

export default function OrdersPage() {
  const { order, advanceOrderStatus } = useVendy();
  const product = getProduct(order.productId)!;
  const shop = getShop(order.sellerShopId)!;
  const flowIndex = orderStatusToFlowIndex(order.status);
  const canValidate =
    order.status === "delivered" || order.status === "waiting_validation";

  return (
    <>
      <MobileTopBar backHref="/profile" title="Mes commandes" />
      <PageContainer className="space-y-5">
        <div className="rounded-vendy-2xl bg-vendy-soft p-4 flex gap-3">
          <div className="relative h-16 w-16 rounded-vendy overflow-hidden shrink-0">
            <Image src={product.image} alt="" fill className="object-cover" sizes="64px" />
          </div>
          <div>
            <p className="font-medium text-vendy-text">{product.name}</p>
            <p className="text-sm text-vendy-secondary">{shop.name}</p>
            <p className="text-xs text-vendy-muted mt-1">{order.id}</p>
          </div>
        </div>

        <VendyFlow
          steps={BUYER_FLOW_STEPS}
          currentIndex={flowIndex}
          variant="vertical"
          title="Suivi de commande"
          subtitle={order.id}
        />

        <TrustLine variant="compact" />

        {canValidate && (
          <Link href="/orders/validate">
            <Button size="lg">Valider ma commande</Button>
          </Link>
        )}

        {order.status === "validated" && (
          <Link href="/orders/discovery">
            <Button variant="secondary" size="md" className="w-full">
              Découvrir d'autres boutiques
            </Button>
          </Link>
        )}

        <Button variant="secondary" size="md" onClick={advanceOrderStatus} className="w-full">
          Simuler : étape suivante
        </Button>

        <Link href="/orders/dispute" className="block text-center text-sm text-vendy-muted">
          Signaler un problème
        </Link>
      </PageContainer>
    </>
  );
}

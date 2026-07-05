"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { useVendy } from "@/lib/context/vendy-provider";
import { getProduct, getShop } from "@/lib/mock/data";

export default function OrderValidatePage() {
  const router = useRouter();
  const { order, validateOrder } = useVendy();
  const product = getProduct(order.productId)!;
  const shop = getShop(order.sellerShopId)!;

  const handleValidate = () => {
    validateOrder();
    router.push("/orders/discovery");
  };

  return (
    <>
      <MobileTopBar backHref="/orders" title="Validation" />
      <PageContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-xl font-semibold">Tout est OK ?</h1>
          <p className="text-sm text-vendy-secondary">
            Valide ta commande pour libérer le paiement au vendeur.
          </p>
        </motion.div>

        <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm flex gap-4">
          <div className="relative h-20 w-20 rounded-vendy overflow-hidden shrink-0">
            <Image src={product.image} alt="" fill className="object-cover" sizes="80px" />
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-vendy-secondary">{shop.name}</p>
            <p className="text-sm font-semibold mt-1">{order.total.toFixed(2)} €</p>
          </div>
        </div>

        <TrustLine variant="checkout" />

        <div className="space-y-2">
          <Button size="lg" onClick={handleValidate}>
            Oui, valider la commande
          </Button>
          <Link href="/orders/dispute">
            <Button variant="outline" size="lg">
              J'ai un problème
            </Button>
          </Link>
        </div>
      </PageContainer>
    </>
  );
}

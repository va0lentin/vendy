"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { ShopCardImmersive } from "@/components/vendy/shop-card-immersive";
import { Button } from "@/components/ui/button";
import { SHOPS } from "@/lib/mock/data";

const SECTIONS = [
  { title: "Boutiques similaires", shops: [SHOPS[3], SHOPS[4]] },
  { title: "Boutiques en essor", shops: [SHOPS[2], SHOPS[1]] },
  { title: "Vous pourriez aimer", shops: [SHOPS[0], SHOPS[4]] },
];

export default function OrderDiscoveryPage() {
  return (
    <>
      <MobileTopBar backHref="/discover" title="Merci !" />
      <PageContainer className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 py-2"
        >
          <span className="text-3xl">✓</span>
          <h1 className="text-xl font-semibold">Commande validée</h1>
          <p className="text-sm text-vendy-secondary max-w-xs mx-auto">
            Le vendeur a été payé. Découvrez d'autres boutiques indépendantes.
          </p>
        </motion.div>

        {SECTIONS.map((section, si) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-vendy-text">{section.title}</h2>
            <div className="space-y-3">
              {section.shops.map((shop) => (
                <ShopCardImmersive key={shop.id} shop={shop} className="w-full max-w-none" />
              ))}
            </div>
          </motion.section>
        ))}

        <Link href="/discover">
          <Button size="lg">Continuer à explorer</Button>
        </Link>
      </PageContainer>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Copy, Share2 } from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { useActiveShop } from "@/lib/context/vendy-provider";

export default function ProductReadyPage() {
  const shop = useActiveShop();
  const [copied, setCopied] = useState(false);
  const productLink = `vendy.app/s/${shop.slug}/sweat-oversized`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(productLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <MobileTopBar backHref="/seller/products" title="Produit publié" />
      <PageContainer className="space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto h-14 w-14 rounded-full bg-vendy-coral-soft flex items-center justify-center"
        >
          <Check className="h-7 w-7 text-vendy-coral" strokeWidth={2.5} />
        </motion.div>

        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold">Ton produit est prêt à vendre</h1>
          <p className="text-sm text-vendy-secondary leading-relaxed">
            Tes clients peuvent payer en sécurité, suivre la livraison et valider
            la commande sur Vendy.
          </p>
        </div>

        <div className="rounded-vendy-lg bg-vendy-soft border border-vendy-border/60 px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-mono truncate">{productLink}</span>
          <button type="button" onClick={handleCopy} className="p-2 shrink-0">
            {copied ? (
              <Check className="h-4 w-4 text-vendy-green" />
            ) : (
              <Copy className="h-4 w-4 text-vendy-coral" />
            )}
          </button>
        </div>

        <TrustLine variant="compact" />

        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="md" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-1" />
            Copier
          </Button>
          <Button variant="outline" size="md">
            <Share2 className="h-4 w-4 mr-1" />
            Partager
          </Button>
        </div>

        <Link href="/profile">
          <Button size="lg">Retour au profil</Button>
        </Link>
      </PageContainer>
    </>
  );
}

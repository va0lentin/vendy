"use client";

import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { PRODUCTS, SELLER_STATS } from "@/lib/mock/data";

export default function PayoutsPage() {
  const stats = SELLER_STATS;

  return (
    <>
      <MobileTopBar backHref="/seller/stats" title="Mes revenus" />
      <PageContainer className="space-y-5">
        <div className="rounded-vendy-xl bg-gradient-to-br from-vendy-coral-soft/80 to-vendy-surface border border-vendy-border/60 p-5 shadow-sm">
          <p className="text-sm text-vendy-secondary">Solde disponible</p>
          <p className="text-3xl font-semibold mt-1">{stats.availableBalance} €</p>
          <p className="text-xs text-vendy-muted mt-2">
            Prochain versement automatique lundi
          </p>
          <Button size="md" className="mt-4 w-full">
            Transférer sur ma banque
          </Button>
        </div>

        <div className="rounded-vendy-lg bg-vendy-surface border border-vendy-border/80 p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-vendy-secondary">En attente de validation</p>
            <p className="text-lg font-semibold">{stats.pendingBalance} €</p>
          </div>
          <span className="text-[10px] font-medium text-vendy-warning bg-orange-50 px-2 py-1 rounded-full">
            En attente
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Dernières transactions</p>
          <div className="space-y-2">
            {[
              { product: PRODUCTS[0], amount: 64, status: "Validé", color: "text-vendy-green" },
              { product: PRODUCTS[2], amount: 42, status: "Versé", color: "text-vendy-green" },
              { product: PRODUCTS[3], amount: 34, status: "En attente", color: "text-vendy-warning" },
            ].map(({ product, amount, status, color }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-vendy-lg bg-vendy-surface border border-vendy-border/80 p-3"
              >
                <div className="relative h-10 w-10 rounded-vendy overflow-hidden shrink-0">
                  <Image src={product.image} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-vendy-muted">+{amount} €</p>
                </div>
                <span className={`text-xs font-medium ${color}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        <TrustLine variant="compact" />
      </PageContainer>
    </>
  );
}

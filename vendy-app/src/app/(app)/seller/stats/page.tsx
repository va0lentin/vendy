"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { SELLER_STATS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function SellerStatsPage() {
  const stats = SELLER_STATS;

  return (
    <>
      <MobileTopBar backHref="/profile" title="Statistiques" />
      <PageContainer className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Ventes (30j)", value: stats.sales30d, detail: "ce mois", accent: true },
            { label: "Conversion", value: `${stats.conversionRate}%`, detail: "visite → achat" },
            { label: "Expédition moy.", value: `${stats.avgShippingDays}j`, detail: "délai moyen" },
            { label: "Validation", value: `${stats.validationRate}%`, detail: "sans litige" },
          ].map(({ label, value, detail, accent }) => (
            <div
              key={label}
              className={cn(
                "rounded-vendy-2xl p-4",
                accent ? "bg-vendy-green" : "bg-vendy-soft",
              )}
            >
              <p className="text-xs text-vendy-black/60">{label}</p>
              <p className="text-3xl font-brand text-vendy-black mt-1 leading-none">{value}</p>
              <p className="text-xs text-vendy-black/50 mt-2">{detail}</p>
            </div>
          ))}
        </div>

        <div className="rounded-vendy-2xl bg-vendy-soft p-4">
          <p className="text-sm font-semibold mb-3">Ventes — 7 derniers jours</p>
          <div className="flex items-end gap-1.5 h-24">
            {stats.sales7d.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-vendy-purple rounded-t-md min-h-[4px]"
                  style={{ height: `${(v / 8) * 100}%` }}
                />
                <span className="text-[9px] text-vendy-muted">
                  {["L", "M", "M", "J", "V", "S", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-vendy-2xl bg-vendy-soft p-4 space-y-3">
          <p className="text-sm font-semibold">Revenus</p>
          <div className="flex justify-between text-sm">
            <span className="text-vendy-secondary">Disponible</span>
            <span className="font-semibold text-vendy-black">{stats.availableBalance} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-vendy-secondary">En attente</span>
            <span className="font-semibold text-vendy-black">{stats.pendingBalance} €</span>
          </div>
          <Link href="/seller/payouts" className="text-sm text-vendy-purple font-semibold">
            Voir les versements →
          </Link>
        </div>

        <div className="rounded-vendy-2xl bg-vendy-green p-4">
          <p className="text-sm font-brand text-vendy-black">
            #{stats.ranking.position} en {stats.ranking.category}
          </p>
          <p className="text-xs text-vendy-black/60 mt-1">
            Encore {stats.ranking.target - stats.ranking.position + 1} ventes pour entrer dans le Top 10
          </p>
        </div>
      </PageContainer>
    </>
  );
}

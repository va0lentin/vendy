"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Package, Wallet } from "lucide-react";
import { MissionCard } from "@/components/seller/mission-card";
import { BadgeUnlockModal } from "@/components/seller/badge-unlock-modal";
import { SELLER_STATS, getProduct } from "@/lib/mock/data";
import { useVendy, useActiveShop } from "@/lib/context/vendy-provider";

export function SellerProfileDashboard() {
  const { user, order, missions, lastUnlockedBadge, clearLastUnlockedBadge } =
    useVendy();
  const shop = useActiveShop();
  const product = getProduct(order.productId)!;
  const stats = SELLER_STATS;
  const salesToTop10 = Math.max(1, stats.ranking.position - stats.ranking.target + 1);
  const nextMission = missions.find((m) => !m.completed);
  const firstName = user.name.split(" ")[0];
  const progressPct = Math.round(
    ((stats.ranking.target - stats.ranking.position) / stats.ranking.target) * 100,
  );

  return (
    <div className="space-y-5">
      {/* En-tête clair */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden border-2 border-vendy-black/10">
            <Image src={user.avatar} alt="" fill className="object-cover" sizes="44px" />
          </div>
          <div className="min-w-0">
            <p className="font-brand text-xl text-vendy-black leading-tight">
              Salut {firstName}
            </p>
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-vendy-secondary font-medium mt-0.5 truncate"
            >
              {shop.name}
              <ChevronDown className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>
        <Link
          href="/seller/stats"
          className="shrink-0 rounded-full bg-vendy-soft px-3 py-1.5 text-xs font-bold text-vendy-black"
        >
          #{stats.ranking.position} · {stats.ranking.category}
        </Link>
      </header>

      {/* 1. Action prioritaire — ce qu'il faut faire maintenant */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wide text-vendy-secondary mb-2">
          À faire maintenant
        </p>
        <Link
          href="/seller/orders"
          className="block rounded-vendy-2xl bg-vendy-green p-4 transition-transform active:scale-[0.99]"
        >
          <div className="flex gap-3">
            <div className="relative h-14 w-14 rounded-vendy-lg overflow-hidden shrink-0 bg-white/40">
              <Image src={product.image} alt="" fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-bold text-white bg-vendy-purple rounded-lg px-2.5 py-1">
                Commande à expédier !
              </span>
              <p className="font-semibold text-vendy-black truncate mt-0.5">{product.name}</p>
              <p className="text-sm text-vendy-black/70 mt-1">
                Avant le {order.deadline}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vendy-black text-white self-center">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>
        </Link>
      </section>

      {/* 2. Chiffres clés — lecture rapide */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wide text-vendy-secondary mb-2">
          Ta boutique
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Ventes", value: String(shop.sales) },
            { label: "Abonnés", value: `${(shop.followers / 1000).toFixed(1)}k` },
            { label: "Note", value: String(shop.rating) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-vendy-xl bg-vendy-soft p-3 text-center">
              <p className="text-lg font-brand text-vendy-black leading-none">{value}</p>
              <p className="text-[10px] font-semibold text-vendy-secondary mt-1.5 uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Progression — compact, sans doubler les stats */}
      <Link
        href="/seller/stats"
        className="block rounded-vendy-2xl bg-vendy-soft p-4 transition-transform active:scale-[0.99]"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="font-semibold text-vendy-black">Objectif Top 10</p>
            <p className="text-sm text-vendy-secondary mt-0.5">
              Encore {salesToTop10} ventes en {stats.ranking.category}
            </p>
          </div>
          <span className="text-sm font-bold text-vendy-purple shrink-0">Voir →</span>
        </div>
        <div className="h-2 rounded-full bg-vendy-black/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-vendy-purple transition-all"
            style={{ width: `${Math.min(100, Math.max(8, progressPct))}%` }}
          />
        </div>
      </Link>

      {/* 4. Une seule mission — pas de doublon visuel vert */}
      {nextMission && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wide text-vendy-secondary">
              Prochaine mission
            </p>
            <Link href="/seller/missions" className="text-xs font-semibold text-vendy-black">
              Toutes →
            </Link>
          </div>
          <MissionCard mission={nextMission} />
        </section>
      )}

      {/* 5. Raccourcis */}
      <section>
        <p className="text-xs font-bold uppercase tracking-wide text-vendy-secondary mb-2">
          Raccourcis
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/seller/products"
            className="flex items-center gap-3 rounded-vendy-xl bg-vendy-soft p-4 font-semibold text-sm text-vendy-black transition-transform active:scale-[0.98]"
          >
            <Package className="h-5 w-5 shrink-0" />
            Mes produits
          </Link>
          <Link
            href="/seller/payouts"
            className="flex items-center gap-3 rounded-vendy-xl bg-vendy-soft p-4 font-semibold text-sm text-vendy-black transition-transform active:scale-[0.98]"
          >
            <Wallet className="h-5 w-5 shrink-0" />
            Mes revenus
          </Link>
        </div>
      </section>

      <BadgeUnlockModal badge={lastUnlockedBadge} onClose={clearLastUnlockedBadge} />
    </div>
  );
}

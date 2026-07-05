"use client";

import Image from "next/image";
import Link from "next/link";
import { Copy, Share2 } from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { SellerProfileDashboard } from "@/components/seller/seller-profile-dashboard";
import { Button } from "@/components/ui/button";
import { useVendy, useActiveShop } from "@/lib/context/vendy-provider";
import { SHOPS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, role, setRole, messagesEnabled, setMessagesEnabled } = useVendy();
  const activeShop = useActiveShop();
  const shopLink = user.sellerMode ? `vendy.app/s/${activeShop.slug}` : null;
  const isSellerView = role === "seller" && user.sellerMode;

  return (
    <PageContainer className="space-y-6">
      {!isSellerView && (
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-vendy-border">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="64px" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-vendy-secondary">{user.email}</p>
          </div>
        </div>
      )}

      <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm space-y-3">
        <p className="text-sm font-medium text-vendy-text">Espace actif</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={role === "buyer" ? "primary" : "secondary"}
            onClick={() => setRole("buyer")}
            className="flex-1"
          >
            Acheteur
          </Button>
          <Button
            size="sm"
            variant={role === "seller" ? "primary" : "secondary"}
            onClick={() => {
              if (user.sellerMode) setRole("seller");
            }}
            disabled={!user.sellerMode}
            className="flex-1"
          >
            Vendeur
          </Button>
        </div>
        {!user.sellerMode && (
          <Link href="/sell">
            <Button variant="outline" size="sm" className="w-full">
              Devenir vendeur
            </Button>
          </Link>
        )}
      </div>

      {isSellerView && <SellerProfileDashboard />}

      {isSellerView && shopLink && (
        <div
          id="share"
          className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-vendy-coral" strokeWidth={1.75} />
            <p className="text-sm font-medium">Partager ma boutique</p>
          </div>
          <p className="text-xs text-vendy-secondary leading-relaxed">
            Partagez ce lien sur Instagram, WhatsApp ou TikTok pour recevoir des
            commandes.
          </p>
          <div className="rounded-vendy-lg bg-vendy-soft border border-vendy-border/60 px-3 py-2.5">
            <p className="text-sm font-mono text-vendy-coral break-all">{shopLink}</p>
          </div>
          <Button size="md" className="w-full gap-2">
            <Copy className="h-4 w-4" />
            Copier le lien
          </Button>
        </div>
      )}

      {isSellerView && user.shopIds.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Mes boutiques</p>
          {user.shopIds.map((id) => {
            const shop = SHOPS.find((s) => s.id === id);
            if (!shop) return null;
            return (
              <Link
                key={id}
                href={`/s/${shop.slug}`}
                className="flex items-center gap-3 rounded-vendy-lg bg-vendy-surface border border-vendy-border/80 p-3"
              >
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={shop.logoImage} alt="" fill className="object-cover" sizes="40px" />
                </div>
                <span className="text-sm font-medium">{shop.name}</span>
              </Link>
            );
          })}
        </div>
      )}

      {isSellerView && (
        <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm space-y-4">
          <p className="text-sm font-medium">Paramètres vendeur</p>
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="text-sm font-medium text-vendy-text">Messagerie</p>
              <p className="text-xs text-vendy-muted mt-0.5">
                Autoriser les messages de vos clients
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={messagesEnabled}
              onClick={() => setMessagesEnabled(!messagesEnabled)}
              className={cn(
                "relative h-7 w-12 rounded-full transition-colors shrink-0",
                messagesEnabled ? "bg-vendy-coral" : "bg-vendy-border",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
                  messagesEnabled ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </label>
        </div>
      )}

      <div className="space-y-1">
        {!isSellerView && (
          <Link
            href="/orders"
            className="flex items-center justify-between py-3 text-sm text-vendy-text border-b border-vendy-border/60"
          >
            Mes commandes
            <span className="text-vendy-muted">→</span>
          </Link>
        )}
        <Link
          href="/aide/confiance"
          className="flex items-center justify-between py-3 text-sm text-vendy-text border-b border-vendy-border/60"
        >
          Protection Vendy
          <span className="text-vendy-muted">→</span>
        </Link>
        <Link
          href="/design"
          className="flex items-center justify-between py-3 text-sm text-vendy-secondary"
        >
          Design system
          <span className="text-vendy-muted">→</span>
        </Link>
      </div>
    </PageContainer>
  );
}

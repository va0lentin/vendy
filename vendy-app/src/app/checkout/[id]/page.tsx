"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { PhoneShell } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { TrustLine } from "@/components/vendy/trust-line";
import { getProduct, getShop } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) return null;
  const shop = getShop(product.shopId)!;
  const shipping = 3.9;
  const protection = 1.9;
  const total = product.price + shipping + protection;

  return (
    <PhoneShell>
      <MobileTopBar backHref={`/p/${id}`} title="Paiement" />
      <div className="px-4 py-5 space-y-5 pb-28">
        <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm">
          <div className="flex gap-3 mb-4">
            <div className="relative h-14 w-14 rounded-vendy overflow-hidden shrink-0">
              <Image src={product.image} alt="" fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="font-medium text-sm">{product.name}</p>
              <p className="text-xs text-vendy-secondary">{shop.name}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm border-t border-vendy-border pt-3">
            <div className="flex justify-between">
              <span className="text-vendy-secondary">Article</span>
              <span>{product.price.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vendy-secondary">Livraison</span>
              <span>{shipping.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vendy-secondary">Protection acheteur</span>
              <span>{protection.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-vendy-border">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Livraison</p>
          <div className="space-y-2">
            {[
              { id: "relay", label: "Point relais", sub: "2 à 4 jours ouvrés", active: true },
              { id: "home", label: "À domicile", sub: "3 à 5 jours ouvrés", active: false },
            ].map((opt) => (
              <div
                key={opt.id}
                className={cn(
                  "rounded-vendy-lg border p-4 flex items-center gap-3",
                  opt.active ? "border-vendy-coral bg-vendy-coral-soft/30" : "border-vendy-border",
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    opt.active ? "border-vendy-coral bg-vendy-coral" : "border-vendy-border",
                  )}
                />
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-vendy-muted">{opt.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TrustLine variant="checkout" />

        <div className="rounded-vendy-lg border border-vendy-border p-4 flex justify-between items-center text-sm">
          <span>•••• 4242</span>
          <span className="text-vendy-muted">Visa</span>
        </div>

        <Link href="/orders">
          <Button size="lg" className="w-full gap-2">
            <Lock className="h-4 w-4" />
            Payer {total.toFixed(2)} €
          </Button>
        </Link>
      </div>
    </PhoneShell>
  );
}

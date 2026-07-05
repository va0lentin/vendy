"use client";

import Link from "next/link";
import { PhoneShell, PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { VendyFlow } from "@/components/vendy/vendy-flow";
import { TrustLine } from "@/components/vendy/trust-line";
import { ProductCardImmersive } from "@/components/vendy/product-card-immersive";
import { ShopCardImmersive } from "@/components/vendy/shop-card-immersive";
import { EncouragementBanner } from "@/components/vendy/encouragement-banner";
import { SELLER_FLOW_STEPS, BUYER_FLOW_STEPS } from "@/lib/flow-steps";
import { PRODUCTS, SHOPS } from "@/lib/mock/data";

const WALKTHROUGH = [
  {
    title: "Onboarding",
    routes: [
      { label: "Welcome", href: "/welcome" },
      { label: "Auth", href: "/auth" },
      { label: "Intention", href: "/intention" },
    ],
  },
  {
    title: "Flux vendeur",
    routes: [
      { label: "Devenir vendeur", href: "/sell" },
      { label: "Créer boutique", href: "/sell/setup" },
      { label: "Personnaliser", href: "/sell/customize" },
      { label: "Boutique prête", href: "/sell/ready" },
      { label: "Ajouter produit", href: "/seller/products/new" },
      { label: "Lien produit", href: "/seller/products/ready" },
      { label: "Profil vendeur", href: "/profile" },
      { label: "Missions & badges", href: "/seller/missions" },
      { label: "Personnaliser boutique", href: "/seller/shop/customize" },
    ],
  },
  {
    title: "Flux acheteur",
    routes: [
      { label: "Produit public", href: "/p/prod-hoodie" },
      { label: "Boutique publique", href: "/s/lina-studio" },
      { label: "Checkout", href: "/checkout/prod-hoodie" },
      { label: "Mes commandes", href: "/orders" },
      { label: "Validation", href: "/orders/validate" },
      { label: "Litige", href: "/orders/dispute" },
      { label: "Découverte post-achat", href: "/orders/discovery" },
    ],
  },
  {
    title: "Découverte & profil",
    routes: [
      { label: "Accueil", href: "/discover" },
      { label: "Parcourir", href: "/browse" },
      { label: "Messages", href: "/messages" },
      { label: "Profil", href: "/profile" },
      { label: "Confiance", href: "/aide/confiance" },
    ],
  },
];

export default function DesignPage() {
  return (
    <PhoneShell>
      <MobileTopBar title="Design System" />
      <PageContainer className="space-y-8 pb-8">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">
            Parcours prototype
          </h2>
          <p className="text-xs text-vendy-secondary leading-relaxed">
            Liens rapides vers tous les flux principaux du prototype Vendy.
          </p>
          <div className="space-y-4">
            {WALKTHROUGH.map((section) => (
              <div key={section.title} className="space-y-2">
                <p className="text-xs font-semibold text-vendy-text">{section.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {section.routes.map((route) => (
                    <Link key={route.href} href={route.href}>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        {route.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Couleurs</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: "Coral", class: "bg-vendy-coral" },
              { name: "Soft", class: "bg-vendy-coral-soft" },
              { name: "Bg", class: "bg-vendy-bg border border-vendy-border" },
              { name: "Surface", class: "bg-vendy-surface border border-vendy-border" },
            ].map(({ name, class: c }) => (
              <div key={name} className={`h-12 w-12 rounded-vendy ${c}`} title={name} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Boutons</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="outline" size="sm">Outline</Button>
            <Button variant="ghost" size="sm">Ghost</Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Encouragement</h2>
          <EncouragementBanner message="C'est presque fini !" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Vendy Flow</h2>
          <VendyFlow steps={SELLER_FLOW_STEPS} currentIndex={4} title="Parcours vendeur" />
          <VendyFlow steps={BUYER_FLOW_STEPS} currentIndex={3} variant="vertical" title="Suivi acheteur" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Confiance</h2>
          <TrustLine variant="inline" />
          <TrustLine variant="checkout" />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-vendy-muted uppercase tracking-wide">Cartes</h2>
          <ProductCardImmersive product={PRODUCTS[1]} className="w-full max-w-none" />
          <ShopCardImmersive shop={SHOPS[1]} className="w-full max-w-none" />
        </section>
      </PageContainer>
    </PhoneShell>
  );
}

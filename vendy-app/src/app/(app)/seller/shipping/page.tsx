"use client";

import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { useVendy } from "@/lib/context/vendy-provider";

export default function ShippingPage() {
  const { order } = useVendy();

  return (
    <>
      <MobileTopBar backHref="/seller/orders" title="Expédition" />
      <PageContainer className="space-y-5 text-center">
        <p className="text-sm text-vendy-muted">{order.id}</p>
        <p className="text-sm text-vendy-secondary">Ton colis est prêt à partir</p>

        <div className="rounded-vendy-xl bg-vendy-surface border border-vendy-border/80 p-8 shadow-sm mx-auto max-w-[240px]">
          <div className="aspect-square bg-vendy-text rounded-lg p-6 grid grid-cols-5 gap-1">
            {[
              1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
            ].map((on, i) => (
              <div key={i} className={`h-2 w-2 ${on ? "bg-white" : "bg-transparent"}`} />
            ))}
          </div>
          <p className="text-xs text-vendy-secondary mt-4">
            Montre ce QR code au point relais
          </p>
        </div>

        <p className="text-sm text-vendy-secondary">Point relais — Mondial Relay · ~1 kg</p>

        <Button variant="secondary" size="md">
          Télécharger le bordereau PDF
        </Button>

        <p className="text-xs text-vendy-muted">
          Dépose ton colis avant {order.deadline} pour être payé rapidement
        </p>

        <Button size="lg">J&apos;ai déposé mon colis</Button>
      </PageContainer>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpressiveTitle } from "@/components/vendy/expressive-title";
import { PhoneShell, PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { useVendy } from "@/lib/context/vendy-provider";
import { cn } from "@/lib/utils";
import type { UserIntention } from "@/types/vendy";

export default function IntentionPage() {
  const router = useRouter();
  const { setIntention, completeOnboarding } = useVendy();
  const [selected, setSelected] = useState<UserIntention | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setIntention(selected);
    completeOnboarding(selected);
    router.push("/discover");
  };

  return (
    <PhoneShell>
      <MobileTopBar backHref="/welcome-in" title="" />
      <PageContainer className="space-y-6">
        <ExpressiveTitle title="Ton intention" />

        <p className="text-sm text-vendy-secondary -mt-2">
          Un compte pour acheter et vendre. Choisis par où commencer.
        </p>

        <div className="space-y-3">
          {(
            [
              {
                id: "buy" as const,
                icon: ShoppingBag,
                title: "Je veux acheter",
                desc: "Découvrir des boutiques indépendantes",
              },
              {
                id: "sell" as const,
                icon: Store,
                title: "Je veux vendre",
                desc: "Créer ma boutique et vendre en ligne",
              },
            ] as const
          ).map(({ id, icon: Icon, title, desc }) => {
            const isSelected = selected === id;
            return (
              <motion.button
                key={id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(id)}
                className={cn(
                  "w-full flex items-center gap-4 rounded-vendy-3xl p-5 text-left transition-all border-2",
                  isSelected
                    ? "border-vendy-black bg-vendy-green shadow-sm"
                    : "bg-vendy-soft hover:bg-vendy-soft/80",
                )}
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border-2",
                    isSelected
                      ? "bg-vendy-black text-white border-vendy-black"
                      : "bg-vendy-black/5 text-vendy-secondary",
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-brand text-lg text-vendy-black">{title}</p>
                  <p className="text-sm text-vendy-secondary mt-0.5">{desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <Button
          size="lg"
          disabled={!selected}
          onClick={handleContinue}
          className="!rounded-2xl !h-14 !text-base !font-bold bg-vendy-black hover:bg-vendy-black/90"
        >
          Continuer
        </Button>
      </PageContainer>
    </PhoneShell>
  );
}

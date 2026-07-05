"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/vendy/empty-state";
import { useVendy } from "@/lib/context/vendy-provider";
import { DISPUTE_REASONS } from "@/lib/mock/data";
import type { DisputeReason } from "@/types/vendy";
import { cn } from "@/lib/utils";

export default function OrderDisputePage() {
  const { submitDispute, disputeSubmitted } = useVendy();
  const [selected, setSelected] = useState<DisputeReason | null>(null);
  const [details, setDetails] = useState("");

  if (disputeSubmitted) {
    return (
      <>
        <MobileTopBar backHref="/orders" title="Signalement" />
        <PageContainer>
          <EmptyState
            emoji="🛡️"
            title="Signalement envoyé"
            description="Notre équipe examine votre dossier sous 24 à 48h. Le paiement reste sécurisé pendant l'enquête."
            actionLabel="Retour aux commandes"
            actionHref="/orders"
          />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <MobileTopBar backHref="/orders/validate" title="Signaler un problème" />
      <PageContainer className="space-y-5">
        <p className="text-sm text-vendy-secondary leading-relaxed">
          Décrivez le problème. Vendy protège votre paiement jusqu'à résolution.
        </p>

        <div className="space-y-2">
          {DISPUTE_REASONS.map((reason, i) => (
            <motion.button
              key={reason.id}
              type="button"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(reason.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-vendy-lg border p-4 text-left transition-all",
                selected === reason.id
                  ? "border-vendy-coral bg-vendy-coral-soft/30 shadow-sm"
                  : "border-vendy-border/80 bg-vendy-surface",
              )}
            >
              <span className="text-xl">{reason.icon}</span>
              <span className="text-sm font-medium">{reason.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.label
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="block space-y-1.5 overflow-hidden"
            >
              <span className="text-sm font-medium">Détails (optionnel)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Décrivez ce qui s'est passé..."
                className="w-full px-4 py-3 rounded-vendy-lg border border-vendy-border bg-vendy-surface text-sm resize-none focus:outline-none focus:ring-2 focus:ring-vendy-coral/30"
              />
            </motion.label>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          disabled={!selected}
          onClick={() => selected && submitDispute(selected)}
        >
          Envoyer le signalement
        </Button>

        <Link
          href="/orders/validate"
          className="block text-center text-sm text-vendy-muted"
        >
          Retour à la validation
        </Link>
      </PageContainer>
    </>
  );
}

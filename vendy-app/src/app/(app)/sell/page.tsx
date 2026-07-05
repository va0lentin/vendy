"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Package,
  Shield,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { PageContainer } from "@/components/layout/phone-shell";
import { Button } from "@/components/ui/button";
import { EncouragementBanner } from "@/components/vendy/encouragement-banner";
import { TrustLine } from "@/components/vendy/trust-line";
import { useVendy } from "@/lib/context/vendy-provider";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: Store,
    title: "Boutique prête en 5 min",
    text: "Pas de site à construire — un lien à partager.",
  },
  {
    icon: Shield,
    title: "Paiement sécurisé",
    text: "Vendy protège chaque transaction.",
  },
  {
    icon: Truck,
    title: "Expédition simplifiée",
    text: "Étiquette ou QR code, sans imprimante.",
  },
];

const STEPS = ["Découvrir", "Créer", "Personnaliser", "C'est prêt"] as const;

export default function SellPage() {
  const router = useRouter();
  const { user, setRole } = useVendy();
  const [step, setStep] = useState(0);

  if (user.sellerMode) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-16 w-16 rounded-full bg-vendy-coral-soft flex items-center justify-center"
        >
          <Store className="h-8 w-8 text-vendy-coral" strokeWidth={1.75} />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Espace vendeur</h2>
          <p className="text-sm text-vendy-secondary max-w-xs leading-relaxed">
            Gérez votre boutique, vos produits et vos commandes depuis votre profil.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
          <Link href="/profile" onClick={() => setRole("seller")}>
            <Button size="md" className="w-full">
              Mon profil
            </Button>
          </Link>
          <Link href="/seller/products/new">
            <Button variant="outline" size="md" className="w-full">
              Ajouter un produit
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6 pb-4">
      <div className="flex gap-1.5">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={cn(
                "h-1 rounded-full transition-colors",
                i <= step ? "bg-vendy-coral" : "bg-vendy-border",
              )}
            />
            <p
              className={cn(
                "text-[9px] mt-1 text-center",
                i === step ? "text-vendy-coral font-medium" : "text-vendy-muted",
              )}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                Vendez depuis votre lien
              </h1>
              <p className="text-sm text-vendy-secondary mt-2 leading-relaxed">
                Transformez Instagram, WhatsApp ou TikTok en boutique sécurisée —
                sans créer un site web.
              </p>
            </div>

            <div className="space-y-3">
              {BENEFITS.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 rounded-vendy-lg bg-vendy-surface border border-vendy-border/80 p-4 shadow-sm"
                >
                  <div className="h-10 w-10 rounded-full bg-vendy-coral-soft flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-vendy-coral" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-vendy-secondary mt-0.5">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <TrustLine variant="inline" />
            <Button size="lg" onClick={() => setStep(1)}>
              Commencer
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="create-hint"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <EncouragementBanner message="Étape 1 sur 3 — ta boutique prend forme" />
            <div className="rounded-vendy-xl bg-gradient-to-br from-vendy-surface to-vendy-coral-soft/40 border border-vendy-border/60 p-5 text-center space-y-3">
              <Package className="h-10 w-10 text-vendy-coral mx-auto" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold">Crée ta boutique</h2>
              <p className="text-sm text-vendy-secondary leading-relaxed">
                Nom, description, catégorie — tout ce qu'il faut pour lancer ta
                vitrine en quelques minutes.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => setStep(0)}>
                Retour
              </Button>
              <Button size="lg" className="flex-1" onClick={() => router.push("/sell/setup")}>
                Continuer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 0 && (
        <p className="text-center text-xs text-vendy-muted">
          <Sparkles className="inline h-3 w-3 mr-1 text-vendy-coral" />
          Même compte pour acheter et vendre
        </p>
      )}
    </PageContainer>
  );
}

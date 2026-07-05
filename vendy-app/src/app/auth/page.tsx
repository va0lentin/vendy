"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  EncouragementBanner,
  ONBOARDING_MESSAGES,
} from "@/components/vendy/encouragement-banner";
import { PhoneShell, PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { useVendy } from "@/lib/context/vendy-provider";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const { setOnboardingStep, completeLogin } = useVendy();
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    if (isLogin) {
      completeLogin();
      router.push("/bonjour?next=/discover");
      return;
    }

    if (step < 2) {
      const next = step + 1;
      setStep(next);
      setOnboardingStep(next);
    } else {
      router.push("/welcome-in");
    }
  };

  return (
    <PhoneShell>
      <MobileTopBar
        backHref="/welcome"
        title={isLogin ? "Connexion" : "Inscription"}
      />
      <PageContainer className="space-y-6">
        <EncouragementBanner
          message={isLogin ? "Bon retour sur Vendy" : ONBOARDING_MESSAGES[step]}
        />

        <motion.div
          key={isLogin ? "login" : step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          {isLogin ? (
            <>
              <h2 className="text-xl font-semibold">Connectez-vous</h2>
              <input
                type="email"
                placeholder="Email"
                defaultValue="lina@vendy.demo"
                className="w-full rounded-vendy-lg bg-vendy-soft px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-vendy-purple/30"
              />
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1">
                  Apple
                </Button>
                <Button variant="secondary" className="flex-1">
                  Google
                </Button>
              </div>
            </>
          ) : (
            <>
              {step === 0 && (
                <>
                  <h2 className="text-xl font-semibold">Créez votre compte</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue="lina@vendy.demo"
                    className="w-full rounded-vendy-lg bg-vendy-soft px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-vendy-purple/30"
                  />
                  <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1">
                      Apple
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Google
                    </Button>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-semibold">Vos informations</h2>
                  <input
                    type="text"
                    placeholder="Prénom et nom"
                    defaultValue="Lina Martin"
                    className="w-full rounded-vendy-lg bg-vendy-soft px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-vendy-purple/30"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    className="w-full rounded-vendy-lg bg-vendy-soft px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-vendy-purple/30"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold">Presque terminé</h2>
                  <p className="text-sm text-vendy-secondary leading-relaxed">
                    Un compte Vendy vous permet d&apos;acheter et de vendre avec le
                    même profil. Choisissez votre intention pour commencer.
                  </p>
                </>
              )}
            </>
          )}
        </motion.div>

        {!isLogin && (
          <div className="flex gap-1.5 justify-center pt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= step ? "w-6 bg-vendy-purple" : "w-1.5 bg-vendy-border"
                }`}
              />
            ))}
          </div>
        )}

        <Button size="lg" onClick={handleContinue}>
          {isLogin ? "Se connecter" : step < 2 ? "Continuer" : "Choisir mon intention"}
        </Button>

        {!isLogin && (
          <p className="text-center text-sm text-vendy-secondary">
            Déjà un compte ?{" "}
            <Link href="/auth?mode=login" className="font-semibold text-vendy-purple">
              Se connecter
            </Link>
          </p>
        )}
      </PageContainer>
    </PhoneShell>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}

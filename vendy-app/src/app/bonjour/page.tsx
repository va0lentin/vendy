"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandGreetingSplash } from "@/components/vendy/brand-greeting-splash";
import { PhoneShell } from "@/components/layout/phone-shell";
import { useVendy } from "@/lib/context/vendy-provider";

function BonjourContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useVendy();
  const firstName = user.name.split(" ")[0];
  const next = searchParams.get("next") || "/discover";

  const handleComplete = useCallback(() => {
    router.replace(next);
  }, [next, router]);

  return (
    <PhoneShell theme="brand">
      <BrandGreetingSplash firstName={firstName} onComplete={handleComplete} />
    </PhoneShell>
  );
}

export default function BonjourPage() {
  return (
    <Suspense fallback={null}>
      <BonjourContent />
    </Suspense>
  );
}

"use client";

import { BrandHero } from "@/components/vendy/brand-hero";
import { PhoneShell } from "@/components/layout/phone-shell";

export default function WelcomePage() {
  return (
    <PhoneShell theme="brand">
      <BrandHero
        ctaHref="/auth"
        ctaLabel="Commencer"
        secondaryHref="/auth?mode=login"
      />
    </PhoneShell>
  );
}

"use client";

import { BrandHero } from "@/components/vendy/brand-hero";
import { PhoneShell } from "@/components/layout/phone-shell";

export default function WelcomeInPage() {
  return (
    <PhoneShell theme="brand">
      <BrandHero
        ctaHref="/intention"
        ctaLabel="C'est parti"
        subtitleLines={["Ta boutique", "t'attend."]}
      />
    </PhoneShell>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVendy } from "@/lib/context/vendy-provider";

export default function HomePage() {
  const router = useRouter();
  const { onboardingComplete } = useVendy();

  useEffect(() => {
    if (!onboardingComplete) {
      router.replace("/welcome");
    } else {
      router.replace("/discover");
    }
  }, [onboardingComplete, router]);

  return null;
}

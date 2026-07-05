"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Redirige l'ancien dashboard vendeur vers le profil (espace vendeur) */
export default function SellerDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile");
  }, [router]);

  return null;
}

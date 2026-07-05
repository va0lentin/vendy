"use client";

import { ReactNode } from "react";
import { PhoneShell } from "@/components/layout/phone-shell";
import { FloatingNav } from "@/components/vendy/floating-nav";
import { useVendy } from "@/lib/context/vendy-provider";

/** Layout partagé pour toutes les pages avec barre de navigation */
export default function AppLayout({ children }: { children: ReactNode }) {
  const { role } = useVendy();

  return (
    <PhoneShell>
      {children}
      <FloatingNav role={role} />
    </PhoneShell>
  );
}

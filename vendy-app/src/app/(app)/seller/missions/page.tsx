"use client";

import { MobileTopBar } from "@/components/layout/mobile-top-bar";
import { PageContainer } from "@/components/layout/phone-shell";
import { MissionCard } from "@/components/seller/mission-card";
import { BadgeGrid, BadgeUnlockModal } from "@/components/seller/badge-unlock-modal";
import { useVendy } from "@/lib/context/vendy-provider";

export default function SellerMissionsPage() {
  const {
    missions,
    badges,
    advanceMission,
    lastUnlockedBadge,
    clearLastUnlockedBadge,
  } = useVendy();

  const completed = missions.filter((m) => m.completed).length;

  return (
    <>
      <MobileTopBar backHref="/profile" title="Missions & badges" />
      <PageContainer className="space-y-6">
        <div className="rounded-vendy-xl bg-gradient-to-br from-vendy-surface to-vendy-coral-soft/30 border border-vendy-border/60 p-4">
          <p className="text-sm font-semibold">Progression</p>
          <p className="text-2xl font-semibold text-vendy-coral mt-1">
            {completed}/{missions.length}
          </p>
          <p className="text-xs text-vendy-muted mt-1">missions complétées</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Missions actives</h2>
          <div className="space-y-2">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                showSimulate
                onSimulate={() => advanceMission(mission.id)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Badges</h2>
          <BadgeGrid badges={badges} />
        </section>
      </PageContainer>

      <BadgeUnlockModal badge={lastUnlockedBadge} onClose={clearLastUnlockedBadge} />
    </>
  );
}

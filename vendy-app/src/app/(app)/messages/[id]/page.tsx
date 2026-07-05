"use client";

import { use } from "react";
import { PageContainer } from "@/components/layout/phone-shell";
import { MobileTopBar } from "@/components/layout/mobile-top-bar";

export default function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <>
      <MobileTopBar backHref="/messages" title="Conversation" />
      <PageContainer className="space-y-4">
        <div className="rounded-vendy-lg bg-vendy-soft px-4 py-3 text-sm text-vendy-secondary">
          Fil de discussion simulé ({id})
        </div>
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-vendy-lg rounded-bl-sm bg-vendy-surface border border-vendy-border px-3 py-2 text-sm">
              Bonjour, le colis est bien parti ?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-vendy-lg rounded-br-sm bg-vendy-coral text-white px-3 py-2 text-sm">
              Oui, expédié ce matin. Vous pouvez suivre la commande dans l&apos;app.
            </div>
          </div>
        </div>
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]">
          <input
            type="text"
            placeholder="Écrire un message..."
            className="w-full rounded-full border border-vendy-border bg-vendy-surface px-4 py-3 text-sm outline-none focus:border-vendy-coral/50"
          />
        </div>
      </PageContainer>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/phone-shell";
import { EmptyState } from "@/components/vendy/empty-state";
import { useVendy } from "@/lib/context/vendy-provider";
import { cn } from "@/lib/utils";

const MOCK_THREADS = [
  {
    id: "t1",
    name: "Emma Laurent",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    preview: "Bonjour, le colis est bien parti ?",
    time: "14:32",
    unread: true,
    role: "acheteuse",
  },
  {
    id: "t2",
    name: "Studio Nori",
    avatar:
      "https://images.unsplash.com/photo-1610701596007-de9036c4c1c8?w=100&h=100&fit=crop",
    preview: "Merci pour votre commande !",
    time: "Hier",
    unread: false,
    role: "boutique",
  },
  {
    id: "t3",
    name: "Support Vendy",
    avatar:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop",
    preview: "Votre commande VDY-2048 est en route.",
    time: "Lun.",
    unread: false,
    role: "vendy",
  },
];

export default function MessagesPage() {
  const { messagesEnabled, role } = useVendy();

  if (!messagesEnabled) {
    return (
      <PageContainer>
        <EmptyState
          emoji="💬"
          title="Messages désactivés"
          description={
            role === "seller"
              ? "Activez la messagerie dans votre profil vendeur pour échanger avec vos clients."
              : "La messagerie n'est pas disponible pour le moment."
          }
          actionLabel={role === "seller" ? "Aller aux paramètres" : undefined}
          actionHref={role === "seller" ? "/profile" : undefined}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-4">
      <h1 className="text-xl font-semibold">Messages</h1>
      <div className="space-y-2">
        {MOCK_THREADS.map((thread) => (
          <Link
            key={thread.id}
            href={`/messages/${thread.id}`}
            className={cn(
              "flex items-center gap-3 rounded-vendy-lg bg-vendy-surface border border-vendy-border/80 p-3 shadow-sm transition-all hover:bg-vendy-soft/50 active:scale-[0.99]",
              thread.unread && "border-vendy-coral/20 bg-vendy-coral-soft/20",
            )}
          >
            <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={thread.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline gap-2">
                <p className={cn("text-sm font-medium truncate", thread.unread && "text-vendy-text")}>
                  {thread.name}
                </p>
                <span className="text-[10px] text-vendy-muted shrink-0">{thread.time}</span>
              </div>
              <p className="text-xs text-vendy-secondary truncate mt-0.5">
                {thread.preview}
              </p>
            </div>
            {thread.unread && (
              <span className="h-2 w-2 rounded-full bg-vendy-coral shrink-0" />
            )}
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}

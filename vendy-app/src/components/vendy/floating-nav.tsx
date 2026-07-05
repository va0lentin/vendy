"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircle,
  Plus,
  Search,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/vendy";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match?: (path: string) => boolean;
}

function getNavItems(_role: UserRole): NavItem[] {
  return [
    {
      href: "/discover",
      label: "Accueil",
      icon: Home,
      match: (p) => p === "/discover" || p === "/",
    },
    {
      href: "/browse",
      label: "Parcourir",
      icon: Search,
      match: (p) => p.startsWith("/browse") || p.startsWith("/shops"),
    },
    {
      href: "/sell",
      label: "Vendre",
      icon: Plus,
      match: (p) =>
        p === "/sell" ||
        p.startsWith("/seller/") ||
        p.startsWith("/seller/products/new") ||
        p.startsWith("/seller/shop/customize"),
    },
    {
      href: "/messages",
      label: "Messages",
      icon: MessageCircle,
      match: (p) => p.startsWith("/messages"),
    },
    {
      href: "/profile",
      label: "Profil",
      icon: User,
      match: (p) => p.startsWith("/profile"),
    },
  ];
}

export function FloatingNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = getNavItems(role);

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[400px]">
      <div className="flex items-end justify-between rounded-full border border-vendy-border/80 bg-vendy-surface/95 px-2 py-2 shadow-vendy-lg backdrop-blur-md">
        {items.map(({ href, label, icon: Icon, match }, index) => {
          const isSell = label === "Vendre";
          const active = match ? match(pathname) : pathname === href;

          if (isSell) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center -mt-4 mx-1"
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full shadow-vendy transition-transform active:scale-95",
                    active
                      ? "bg-vendy-black text-white ring-4 ring-vendy-black/15"
                      : "bg-vendy-purple text-white",
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.25} />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium mt-1",
                    active ? "text-vendy-purple" : "text-vendy-muted",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1.5 min-w-[52px] transition-colors flex-1",
                active ? "text-vendy-purple" : "text-vendy-muted hover:text-vendy-secondary",
                index === 0 && "pl-1",
                index === items.length - 1 && "pr-1",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
              <span className="text-[10px] font-medium">{label}</span>
              {active && (
                <span className="h-1 w-1 rounded-full bg-vendy-purple -mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

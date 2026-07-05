"use client";

import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Package,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = [Package, Share2, ShoppingBag, Tag, Truck, ShieldCheck, Wallet];

interface VendyFlowProps {
  steps: readonly { id: string; label: string }[];
  currentIndex: number;
  variant?: "horizontal" | "vertical";
  title?: string;
  subtitle?: string;
  className?: string;
}

export function VendyFlow({
  steps,
  currentIndex,
  variant = "horizontal",
  title,
  subtitle,
  className,
}: VendyFlowProps) {
  const progress = ((currentIndex + 1) / steps.length) * 100;

  if (variant === "vertical") {
    return (
      <div className={cn("rounded-vendy-xl bg-vendy-soft p-5", className)}>
        {title && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-vendy-text">{title}</p>
            {subtitle && (
              <p className="text-xs text-vendy-muted mt-0.5">{subtitle}</p>
            )}
          </div>
        )}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            const Icon = ICONS[i] ?? Package;
            return (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={active ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: active ? Infinity : 0, duration: 2 }}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                      done && "border-vendy-green bg-vendy-green text-white",
                      active && "border-vendy-coral bg-vendy-coral-soft text-vendy-coral",
                      !done && !active && "border-vendy-border bg-vendy-soft text-vendy-muted",
                    )}
                  >
                    {done ? (
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 min-h-[24px] my-1 rounded-full",
                        i < currentIndex ? "bg-vendy-coral/40" : "bg-vendy-border",
                      )}
                    />
                  )}
                </div>
                <div className={cn("pb-5 pt-1", i === steps.length - 1 && "pb-0")}>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      active && "text-vendy-coral",
                      done && "text-vendy-text",
                      !done && !active && "text-vendy-muted",
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-vendy-xl bg-vendy-soft p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && (
            <p className="text-sm font-semibold text-vendy-text">{title}</p>
          )}
          {subtitle && (
            <p className="text-xs text-vendy-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        <span className="text-xs font-medium text-vendy-coral">
          Étape {currentIndex + 1} sur {steps.length}
        </span>
      </div>

      <div className="relative mb-4">
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-vendy-border rounded-full" />
        <motion.div
          className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-vendy-coral/60 to-vendy-coral rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `calc(${((currentIndex / (steps.length - 1)) * 100).toFixed(0)}% - 2rem)`,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            const Icon = ICONS[i] ?? Package;
            return (
              <div key={step.id} className="flex flex-col items-center gap-1.5 w-10">
                <motion.div
                  animate={active ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ repeat: active ? Infinity : 0, duration: 2.5 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-sm",
                    done && "border-vendy-coral bg-vendy-coral text-white",
                    active && "border-vendy-coral bg-vendy-surface text-vendy-coral ring-4 ring-vendy-coral/15",
                    !done && !active && "border-transparent bg-vendy-black/5 text-vendy-muted",
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </motion.div>
                <span
                  className={cn(
                    "text-[9px] font-medium text-center leading-tight max-w-[48px]",
                    active ? "text-vendy-coral" : "text-vendy-muted",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-1 rounded-full bg-vendy-border overflow-hidden">
        <motion.div
          className="h-full bg-vendy-coral rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

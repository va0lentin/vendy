"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Badge } from "@/types/vendy";
import { DoodleStar } from "@/components/vendy/brand-doodles";
import { cn } from "@/lib/utils";

interface BadgeUnlockModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  return (
    <AnimatePresence>
      {badge && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-vendy-purple/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-x-4 top-1/2 z-[70] -translate-y-1/2 mx-auto max-w-sm rounded-vendy-3xl bg-vendy-green p-8 shadow-vendy-lg text-center"
          >
            <DoodleStar className="mx-auto mb-4" />
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
              className="text-5xl mb-3"
            >
              {badge.emoji}
            </motion.div>
            <p className="text-xs font-bold text-vendy-purple uppercase tracking-wide mb-1">
              Badge débloqué
            </p>
            <h3 className="text-2xl font-brand text-vendy-black">{badge.title}</h3>
            <p className="text-sm text-vendy-black/70 mt-2 leading-relaxed">
              {badge.description}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full h-12 rounded-2xl bg-vendy-black text-white font-bold text-sm transition-transform active:scale-[0.98]"
            >
              Super !
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface BadgeGridProps {
  badges: Badge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            "rounded-vendy-2xl border-2 p-3 text-center",
            badge.unlocked
              ? "bg-vendy-green/30 border-vendy-green"
              : "bg-vendy-soft/50 border-vendy-border/40 opacity-60",
          )}
        >
          <span className={cn("text-2xl block mb-1.5", !badge.unlocked && "grayscale")}>
            {badge.emoji}
          </span>
          <p className="text-[10px] font-bold text-vendy-black leading-tight">
            {badge.title}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

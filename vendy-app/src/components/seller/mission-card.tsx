"use client";

import { motion } from "framer-motion";
import type { Mission } from "@/types/vendy";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  onSimulate?: () => void;
  showSimulate?: boolean;
  featured?: boolean;
}

export function MissionCard({
  mission,
  onSimulate,
  showSimulate,
  featured,
}: MissionCardProps) {
  const pct = mission.completed ? 100 : (mission.progress / mission.total) * 100;

  if (featured && !mission.completed) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-vendy-3xl bg-vendy-green p-5"
      >
        <p className="text-xs font-bold text-vendy-purple bg-vendy-purple/10 inline-block px-2.5 py-1 rounded-lg mb-3">
          Mission en cours
        </p>
        <p className="font-brand text-xl text-vendy-black leading-tight">{mission.label}</p>
        <p className="text-sm text-vendy-black/70 mt-1.5 leading-relaxed">{mission.description}</p>
        <div className="h-2 rounded-full bg-vendy-black/10 mt-4 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-vendy-purple"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs font-bold text-vendy-black mt-2">
          {mission.progress}/{mission.total}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-vendy-2xl px-4 py-3.5 transition-colors",
        mission.completed ? "bg-vendy-green/40" : "bg-vendy-soft",
      )}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-vendy-black">{mission.label}</p>
          <p className="text-xs text-vendy-secondary mt-0.5 leading-relaxed">
            {mission.description}
          </p>
        </div>
        <span className="text-xs font-bold shrink-0 text-vendy-black">
          {mission.completed ? "✓" : `${mission.progress}/${mission.total}`}
        </span>
      </div>

      <div className="h-2 rounded-full bg-vendy-black/10 overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            mission.completed ? "bg-vendy-green" : "bg-vendy-purple",
          )}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {showSimulate && !mission.completed && onSimulate && (
        <button
          type="button"
          onClick={onSimulate}
          className="mt-2.5 text-xs text-vendy-purple font-bold"
        >
          Simuler la progression →
        </button>
      )}
    </motion.div>
  );
}

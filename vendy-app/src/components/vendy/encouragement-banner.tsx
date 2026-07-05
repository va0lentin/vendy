"use client";

import { motion, AnimatePresence } from "framer-motion";

interface EncouragementBannerProps {
  message: string;
  visible?: boolean;
}

export function EncouragementBanner({
  message,
  visible = true,
}: EncouragementBannerProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-vendy-lg bg-vendy-purple-soft border border-vendy-purple/15 px-4 py-3"
        >
          <p className="text-sm font-medium text-vendy-purple text-center">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const ONBOARDING_MESSAGES = [
  "Bienvenue sur Vendy",
  "Plus qu'une étape",
  "C'est presque fini",
  "Top !",
  "Vendre sera bientôt à vous",
] as const;

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  emoji = "✨",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-4 py-12 px-4",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="h-16 w-16 rounded-full bg-vendy-soft flex items-center justify-center text-3xl"
      >
        {emoji}
      </motion.div>
      <div className="space-y-2 max-w-xs">
        <h2 className="text-lg font-semibold text-vendy-text">{title}</h2>
        <p className="text-sm text-vendy-secondary leading-relaxed">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="md">{actionLabel}</Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

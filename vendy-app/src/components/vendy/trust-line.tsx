import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type TrustVariant = "inline" | "compact" | "checkout";

interface TrustLineProps {
  variant?: TrustVariant;
  className?: string;
}

const MESSAGES = {
  inline: "Paiement sécurisé — le vendeur est payé après votre validation.",
  compact: "Une fois la commande validée, le vendeur reçoit son paiement.",
  checkout: {
    title: "Commande sécurisée",
    body: "Votre paiement est conservé jusqu'à votre validation de réception.",
  },
};

export function TrustLine({ variant = "inline", className }: TrustLineProps) {
  if (variant === "checkout") {
    return (
      <div
        className={cn(
          "rounded-vendy-lg bg-vendy-soft px-4 py-3.5",
          className,
        )}
      >
        <div className="flex gap-3">
          <Lock className="h-4 w-4 text-vendy-muted shrink-0 mt-0.5" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-medium text-vendy-text">
              {MESSAGES.checkout.title}
            </p>
            <p className="text-xs text-vendy-secondary mt-0.5 leading-relaxed">
              {MESSAGES.checkout.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <p
      className={cn(
        "flex items-start gap-1.5 text-xs text-vendy-muted leading-relaxed",
        className,
      )}
    >
      <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5" strokeWidth={1.75} />
      {variant === "inline" ? MESSAGES.inline : MESSAGES.compact}
    </p>
  );
}

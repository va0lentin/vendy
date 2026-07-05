import { cn } from "@/lib/utils";

export function DoodleFlower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("w-28 h-28", className)}
    >
      <ellipse
        cx="50"
        cy="22"
        rx="12"
        ry="18"
        stroke="#ED9AFF"
        strokeWidth="3"
        fill="none"
        transform="rotate(0 50 50)"
      />
      <ellipse
        cx="50"
        cy="22"
        rx="12"
        ry="18"
        stroke="#ED9AFF"
        strokeWidth="3"
        fill="none"
        transform="rotate(72 50 50)"
      />
      <ellipse
        cx="50"
        cy="22"
        rx="12"
        ry="18"
        stroke="#ED9AFF"
        strokeWidth="3"
        fill="none"
        transform="rotate(144 50 50)"
      />
      <ellipse
        cx="50"
        cy="22"
        rx="12"
        ry="18"
        stroke="#ED9AFF"
        strokeWidth="3"
        fill="none"
        transform="rotate(216 50 50)"
      />
      <ellipse
        cx="50"
        cy="22"
        rx="12"
        ry="18"
        stroke="#ED9AFF"
        strokeWidth="3"
        fill="none"
        transform="rotate(288 50 50)"
      />
      <circle cx="50" cy="50" r="6" fill="#ED9AFF" />
    </svg>
  );
}

export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" aria-hidden className={cn("w-14 h-14", className)}>
      <path
        d="M28 2 L32 20 L50 20 L36 30 L42 50 L28 38 L14 50 L20 30 L6 20 L24 20 Z"
        fill="#A0FF83"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 72" fill="none" aria-hidden className={cn("w-10 h-16", className)}>
      <path
        d="M24 2 C26 22, 20 42, 24 62 M14 52 C20 60, 26 62, 34 54"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function DoodleSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("w-8 h-8", className)}>
      <path
        d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z"
        fill="#A0FF83"
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  );
}

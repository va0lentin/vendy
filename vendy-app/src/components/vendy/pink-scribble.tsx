import { cn } from "@/lib/utils";

export function PinkScribble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 16"
      fill="none"
      aria-hidden
      className={cn("h-3 w-28 text-vendy-pink", className)}
    >
      <path
        d="M2 10 C18 4, 34 14, 52 8 C70 2, 88 12, 106 6 C112 4, 116 8, 118 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

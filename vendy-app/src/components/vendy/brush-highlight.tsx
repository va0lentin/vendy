import { cn } from "@/lib/utils";

interface BrushHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export function BrushHighlight({ children, className }: BrushHighlightProps) {
  return (
    <span className={cn("relative inline-block align-middle", className)}>
      <span
        aria-hidden
        className="absolute -left-1 -right-1 top-[0.06em] bottom-[0.04em] bg-white rounded-md -rotate-1"
      />
      <span className="relative inline-block px-1.5 py-0.5 text-vendy-black font-brand leading-none">
        {children}
      </span>
    </span>
  );
}

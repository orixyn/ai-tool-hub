import Link from "next/link";
import { PRICING_LABELS } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

const pricingColors: Record<string, string> = {
  free: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  freemium: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  paid: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  enterprise: "border-violet-500/30 text-violet-400 bg-violet-500/10",
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="corner-marks glow-border group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-surface/80 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)] active:scale-[0.98]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background font-mono text-[13px] font-bold text-muted transition-colors duration-200 group-hover:border-accent/30 group-hover:text-accent">
          {tool.name.charAt(0)}
        </div>
        <span
          className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${pricingColors[tool.pricing_type] ?? ""}`}
        >
          {PRICING_LABELS[tool.pricing_type] ?? tool.pricing_type}
        </span>
      </div>
      <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
        {tool.name}
      </h3>
      <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-muted">
        {tool.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {tool.use_cases.slice(0, 2).map((uc) => (
          <span
            key={uc}
            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted"
          >
            {uc}
          </span>
        ))}
      </div>
    </Link>
  );
}

import Link from "next/link";
import { PRICING_LABELS } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

const pricingColors: Record<string, string> = {
  free: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  freemium: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  paid: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  enterprise: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-[13px] font-bold text-muted">
          {tool.name.charAt(0)}
        </div>
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${pricingColors[tool.pricing_type] ?? ""}`}
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
            className="rounded-md bg-background px-2 py-0.5 text-[11px] text-muted"
          >
            {uc}
          </span>
        ))}
      </div>
    </Link>
  );
}

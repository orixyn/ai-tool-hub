import Link from "next/link";
import { PRICING_LABELS } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

const pricingColors: Record<string, string> = {
  free: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  paid: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  enterprise: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-lg border border-neutral-200 p-5 transition-colors duration-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-sm font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          {tool.name.charAt(0)}
        </div>
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-medium ${pricingColors[tool.pricing_type] ?? ""}`}
        >
          {PRICING_LABELS[tool.pricing_type] ?? tool.pricing_type}
        </span>
      </div>
      <h3 className="mb-1 font-medium group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
        {tool.name}
      </h3>
      <p className="mb-3 line-clamp-2 text-sm text-neutral-500">
        {tool.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {tool.use_cases.slice(0, 2).map((uc) => (
          <span
            key={uc}
            className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {uc}
          </span>
        ))}
      </div>
    </Link>
  );
}

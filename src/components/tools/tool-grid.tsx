import { ToolCard } from "./tool-card";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

export function ToolGrid({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) {
    return (
      <p className="py-12 text-center text-neutral-500">
        ツールが見つかりませんでした
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

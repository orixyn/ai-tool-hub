import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ToolGrid } from "@/components/tools/tool-grid";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

export default async function FavoritesPage() {
  const { userId } = await auth();
  const supabase = await createClient();

  const { data: favorites } = await supabase
    .from("favorites")
    .select("tool_id")
    .eq("user_id", userId!)
    .order("created_at", { ascending: false });

  const toolIds = (favorites ?? []).map(
    (f: { tool_id: string }) => f.tool_id
  );

  let tools: Tool[] = [];
  if (toolIds.length > 0) {
    const { data } = await supabase
      .from("tools")
      .select("*")
      .in("id", toolIds);
    tools = (data ?? []) as Tool[];

    // Preserve favorites order
    tools.sort(
      (a, b) => toolIds.indexOf(a.id) - toolIds.indexOf(b.id)
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <ArrowLeft size={14} />
        ダッシュボードに戻る
      </Link>

      <h1 className="mb-8 text-2xl font-bold">お気に入り</h1>

      {tools.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 p-12 text-center dark:border-neutral-800">
          <p className="mb-2 text-neutral-500">
            お気に入り登録したツールはまだありません
          </p>
          <Link
            href="/tools"
            className="text-sm text-neutral-900 underline dark:text-neutral-100"
          >
            ツールを探す
          </Link>
        </div>
      ) : (
        <ToolGrid tools={tools} />
      )}
    </div>
  );
}

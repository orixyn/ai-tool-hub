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

    tools.sort(
      (a, b) => toolIds.indexOf(a.id) - toolIds.indexOf(b.id)
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/dashboard"
        className="group mb-8 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        ダッシュボードに戻る
      </Link>

      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] tracking-widest text-accent uppercase">
          // Favorites
        </p>
        <h1 className="text-2xl font-bold tracking-tight">お気に入り</h1>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-16 text-center">
          <p className="mb-3 font-mono text-[13px] text-muted">
            // Empty
          </p>
          <p className="mb-4 text-[14px] text-muted">
            お気に入り登録したツールはまだありません
          </p>
          <Link
            href="/tools"
            className="btn-slide inline-block rounded-md border border-accent/40 px-4 py-2 text-[13px] font-medium text-accent transition-colors duration-200 hover:text-background active:scale-95"
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

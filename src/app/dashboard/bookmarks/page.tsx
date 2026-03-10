import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BookmarkList } from "@/components/bookmarks/bookmark-list";

export default async function BookmarksPage() {
  const { userId } = await auth();
  const supabase = await createClient();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId!)
    .order("is_done", { ascending: true })
    .order("created_at", { ascending: false });

  const typedBookmarks = (bookmarks ?? []) as Array<{
    id: string;
    tool_id: string;
    memo: string | null;
    is_done: boolean;
    due_date: string | null;
    created_at: string;
  }>;

  const toolIds = typedBookmarks.map((b) => b.tool_id);

  let toolMap: Record<string, { name: string; slug: string }> = {};
  if (toolIds.length > 0) {
    const { data: tools } = await supabase
      .from("tools")
      .select("id, name, slug")
      .in("id", toolIds);

    for (const t of (tools ?? []) as Array<{
      id: string;
      name: string;
      slug: string;
    }>) {
      toolMap[t.id] = { name: t.name, slug: t.slug };
    }
  }

  const bookmarksWithTools = typedBookmarks.map((b) => ({
    ...b,
    tool_name: toolMap[b.tool_id]?.name ?? "不明なツール",
    tool_slug: toolMap[b.tool_id]?.slug ?? "",
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
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
          // Bookmarks & ToDo
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          ブックマーク & ToDo
        </h1>
      </div>

      {bookmarksWithTools.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface p-16 text-center">
          <p className="mb-3 font-mono text-[13px] text-muted">
            // Empty
          </p>
          <p className="mb-4 text-[14px] text-muted">
            ブックマークしたツールはまだありません
          </p>
          <Link
            href="/tools"
            className="btn-slide inline-block rounded-md border border-accent/40 px-4 py-2 text-[13px] font-medium text-accent transition-colors duration-200 hover:text-background active:scale-95"
          >
            ツールを探す
          </Link>
        </div>
      ) : (
        <BookmarkList bookmarks={bookmarksWithTools} />
      )}
    </div>
  );
}

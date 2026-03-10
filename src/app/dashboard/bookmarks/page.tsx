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
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <ArrowLeft size={14} />
        ダッシュボードに戻る
      </Link>

      <h1 className="mb-8 text-2xl font-bold">ブックマーク & ToDo</h1>

      {bookmarksWithTools.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 p-12 text-center dark:border-neutral-800">
          <p className="mb-2 text-neutral-500">
            ブックマークしたツールはまだありません
          </p>
          <Link
            href="/tools"
            className="text-sm text-neutral-900 underline dark:text-neutral-100"
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

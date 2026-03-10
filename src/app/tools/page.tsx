import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ToolGrid } from "@/components/tools/tool-grid";
import { CategoryFilter } from "@/components/tools/category-filter";
import { SearchBar } from "@/components/tools/search-bar";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const supabase = await createClient();

  let categoryId: string | undefined;

  if (category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single();
    categoryId = (cat as { id: string } | null)?.id;
  }

  let query = supabase.from("tools").select("*");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (q) {
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data } = await query.order("created_at", {
    ascending: false,
  });

  const tools = (data ?? []) as Tool[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 text-2xl font-bold tracking-tight">ツール一覧</h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Suspense>
          <CategoryFilter />
        </Suspense>
        <div className="w-full sm:max-w-xs">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      {q && (
        <p className="mb-8 text-[13px] text-muted">
          「{q}」の検索結果: {tools.length}件
        </p>
      )}

      <ToolGrid tools={tools} />
    </div>
  );
}

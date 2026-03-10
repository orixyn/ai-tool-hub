import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { checkFavorite } from "@/actions/favorites";
import { checkBookmark } from "@/actions/bookmarks";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { BookmarkButton } from "@/components/bookmarks/bookmark-button";
import { PRICING_LABELS } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

const pricingColors: Record<string, string> = {
  free: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  paid: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  enterprise:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tool) notFound();

  const typedTool = tool as Tool;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", typedTool.category_id)
    .single();

  const typedCategory = category as Category | null;

  const [isFavorited, isBookmarked] = await Promise.all([
    checkFavorite(typedTool.id),
    checkBookmark(typedTool.id),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Back link */}
      <Link
        href="/tools"
        className="mb-8 inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <ArrowLeft size={14} />
        ツール一覧に戻る
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 text-lg font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {typedTool.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{typedTool.name}</h1>
              {typedCategory && (
                <Link
                  href={`/tools?category=${typedCategory.slug}`}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  {typedCategory.name}
                </Link>
              )}
            </div>
          </div>
        </div>
        <span
          className={`rounded-lg px-3 py-1 text-sm font-medium ${pricingColors[typedTool.pricing_type] ?? ""}`}
        >
          {PRICING_LABELS[typedTool.pricing_type] ?? typedTool.pricing_type}
        </span>
      </div>

      {/* Actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <FavoriteButton toolId={typedTool.id} initialFavorited={isFavorited} />
        <BookmarkButton
          toolId={typedTool.id}
          initialBookmarked={isBookmarked}
        />
        <a
          href={typedTool.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          <ExternalLink size={16} />
          公式サイトを開く
        </a>
      </div>

      {/* Description */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">概要</h2>
        <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
          {typedTool.description}
        </p>
      </section>

      {/* Pricing */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">料金</h2>
        <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ${pricingColors[typedTool.pricing_type] ?? ""}`}
            >
              {PRICING_LABELS[typedTool.pricing_type] ?? typedTool.pricing_type}
            </span>
            {typedTool.pricing_detail && (
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {typedTool.pricing_detail}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      {typedTool.use_cases.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">用途</h2>
          <div className="flex flex-wrap gap-2">
            {typedTool.use_cases.map((uc) => (
              <span
                key={uc}
                className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {uc}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

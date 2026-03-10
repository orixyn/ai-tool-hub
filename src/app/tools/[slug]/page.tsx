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
  free: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  freemium: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  paid: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  enterprise: "border-violet-500/30 text-violet-400 bg-violet-500/10",
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
    <div className="mx-auto max-w-2xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/tools"
        className="group mb-10 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        ツール一覧に戻る
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-4">
          <div className="corner-marks flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-surface font-mono text-lg font-bold text-muted">
            {typedTool.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {typedTool.name}
            </h1>
            <div className="mt-1.5 flex items-center gap-3">
              {typedCategory && (
                <Link
                  href={`/tools?category=${typedCategory.slug}`}
                  className="font-mono text-[12px] text-muted transition-colors duration-200 hover:text-accent"
                >
                  {typedCategory.name}
                </Link>
              )}
              <span
                className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${pricingColors[typedTool.pricing_type] ?? ""}`}
              >
                {PRICING_LABELS[typedTool.pricing_type] ??
                  typedTool.pricing_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-12 flex flex-wrap gap-3">
        <FavoriteButton toolId={typedTool.id} initialFavorited={isFavorited} />
        <BookmarkButton
          toolId={typedTool.id}
          initialBookmarked={isBookmarked}
        />
        <a
          href={typedTool.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-slide cta-glow flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-4 py-2.5 text-[13px] font-medium text-accent transition-colors duration-300 hover:text-background active:scale-95"
        >
          <ExternalLink size={14} />
          公式サイトを開く
        </a>
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-[11px] tracking-widest text-accent uppercase">
          // Overview
        </h2>
        <p className="text-[15px] leading-[1.8] text-foreground/80">
          {typedTool.description}
        </p>
      </section>

      {/* Pricing */}
      <section className="mb-10">
        <h2 className="mb-4 font-mono text-[11px] tracking-widest text-accent uppercase">
          // Pricing
        </h2>
        <div className="corner-marks rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <span
              className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${pricingColors[typedTool.pricing_type] ?? ""}`}
            >
              {PRICING_LABELS[typedTool.pricing_type] ??
                typedTool.pricing_type}
            </span>
            {typedTool.pricing_detail && (
              <span className="text-[14px] text-muted">
                {typedTool.pricing_detail}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      {typedTool.use_cases.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-mono text-[11px] tracking-widest text-accent uppercase">
            // Use Cases
          </h2>
          <div className="flex flex-wrap gap-2">
            {typedTool.use_cases.map((uc) => (
              <span
                key={uc}
                className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-foreground/70"
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

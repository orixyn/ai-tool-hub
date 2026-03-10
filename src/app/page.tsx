import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import * as icons from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ToolGrid } from "@/components/tools/tool-grid";
import { CATEGORIES } from "@/lib/constants";
import type { Database } from "@/lib/supabase/types";

type Tool = Database["public"]["Tables"]["tools"]["Row"];
type IconName = keyof typeof icons;

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("tools")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const featuredTools = (data ?? []) as Tool[];

  return (
    <div>
      {/* Hero */}
      <section className="scan-line relative overflow-hidden">
        {/* Grid background */}
        <div className="hud-grid pointer-events-none absolute inset-0" />
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(6,182,212,0.1),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-accent uppercase">
              AI Tool Discovery Platform
            </span>
          </div>

          <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            最適な
            <span className="text-accent">AIツール</span>
            を
            <br />
            見つけよう
          </h1>
          <p className="mb-12 max-w-lg text-[15px] leading-relaxed text-muted">
            画像生成、コーディング、ライティングなど、目的に合ったAIツールを検索・比較・管理できます。
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="cta-glow btn-slide group inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-6 py-3 text-[13px] font-medium text-accent transition-colors duration-300 hover:text-background active:scale-95"
            >
              ツールを探す
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#categories"
              className="group flex items-center gap-1 text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              カテゴリ一覧
              <ChevronRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] tracking-widest text-accent uppercase">
                // Featured
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                注目のツール
              </h2>
            </div>
            <Link
              href="/tools"
              className="group flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-200 hover:text-accent"
            >
              すべて見る
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <ToolGrid tools={featuredTools} />
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mb-12">
            <p className="mb-2 font-mono text-[11px] tracking-widest text-accent uppercase">
              // Categories
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              カテゴリから探す
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = icons[cat.icon as IconName] as icons.LucideIcon;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools?category=${cat.slug}`}
                  className="corner-marks glow-border group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:bg-surface/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] active:scale-[0.98]"
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                  )}
                  <span className="text-[14px] font-medium">{cat.name}</span>
                  <ChevronRight
                    size={14}
                    className="ml-auto text-border transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

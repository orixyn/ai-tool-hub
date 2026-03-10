import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28">
          <p className="mb-4 text-[13px] font-medium tracking-widest text-accent uppercase">
            AI Tool Discovery
          </p>
          <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            最適なAIツールを
            <br />
            見つけよう
          </h1>
          <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-muted">
            画像生成、コーディング、ライティングなど、目的に合ったAIツールを検索・比較・管理できます。
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-opacity duration-200 hover:opacity-80"
            >
              ツールを探す
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/tools"
              className="text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              カテゴリ一覧
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[12px] font-medium tracking-widest text-muted uppercase">
                Featured
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                注目のツール
              </h2>
            </div>
            <Link
              href="/tools"
              className="flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              すべて見る
              <ArrowRight size={13} />
            </Link>
          </div>
          <ToolGrid tools={featuredTools} />
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <p className="mb-1 text-[12px] font-medium tracking-widest text-muted uppercase">
              Categories
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
                  className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                  )}
                  <span className="text-[14px] font-medium">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

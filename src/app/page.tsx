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
      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            最適なAIツールを見つけよう
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-neutral-500">
            画像生成、コーディング、ライティングなど、
            目的に合ったAIツールを検索・比較・管理できます。
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            ツールを探す
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">注目のツール</h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            すべて見る
            <ArrowRight size={14} />
          </Link>
        </div>
        <ToolGrid tools={featuredTools ?? []} />
      </section>

      {/* Categories */}
      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">カテゴリから探す</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = icons[cat.icon as IconName] as icons.LucideIcon;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools?category=${cat.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-neutral-200 p-5 transition-colors duration-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
                >
                  {Icon && <Icon size={22} className="text-neutral-500" />}
                  <span className="font-medium">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

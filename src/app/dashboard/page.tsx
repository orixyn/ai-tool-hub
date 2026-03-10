import Link from "next/link";
import { Heart, Bookmark } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-2xl font-bold tracking-tight">
        ダッシュボード
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/favorites"
          className="group flex items-center gap-5 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          <Heart
            size={22}
            className="text-muted transition-colors duration-200 group-hover:text-accent"
          />
          <div>
            <p className="text-[15px] font-medium">お気に入り</p>
            <p className="mt-0.5 text-[13px] text-muted">
              お気に入り登録したツール
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/bookmarks"
          className="group flex items-center gap-5 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          <Bookmark
            size={22}
            className="text-muted transition-colors duration-200 group-hover:text-accent"
          />
          <div>
            <p className="text-[15px] font-medium">ブックマーク & ToDo</p>
            <p className="mt-0.5 text-[13px] text-muted">
              ブックマークとメモの管理
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

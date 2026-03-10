import Link from "next/link";
import { Heart, Bookmark, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] tracking-widest text-accent uppercase">
          // Dashboard
        </p>
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/dashboard/favorites"
          className="corner-marks glow-border group flex items-center gap-5 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:bg-surface/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] active:scale-[0.98]"
        >
          <Heart
            size={22}
            className="text-muted transition-colors duration-200 group-hover:text-red-400"
          />
          <div className="flex-1">
            <p className="text-[15px] font-medium">お気に入り</p>
            <p className="mt-0.5 text-[13px] text-muted">
              お気に入り登録したツール
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-border transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Link>

        <Link
          href="/dashboard/bookmarks"
          className="corner-marks glow-border group flex items-center gap-5 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:bg-surface/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] active:scale-[0.98]"
        >
          <Bookmark
            size={22}
            className="text-muted transition-colors duration-200 group-hover:text-cyan-400"
          />
          <div className="flex-1">
            <p className="text-[15px] font-medium">ブックマーク & ToDo</p>
            <p className="mt-0.5 text-[13px] text-muted">
              ブックマークとメモの管理
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-border transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </Link>
      </div>
    </div>
  );
}

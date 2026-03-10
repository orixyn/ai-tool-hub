import Link from "next/link";
import { Heart, Bookmark } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">ダッシュボード</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/dashboard/favorites"
          className="flex items-center gap-4 rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <Heart size={24} className="text-neutral-500" />
          <div>
            <p className="font-medium">お気に入り</p>
            <p className="text-sm text-neutral-500">
              お気に入り登録したツール
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/bookmarks"
          className="flex items-center gap-4 rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <Bookmark size={24} className="text-neutral-500" />
          <div>
            <p className="font-medium">ブックマーク & ToDo</p>
            <p className="text-sm text-neutral-500">
              ブックマークとメモの管理
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

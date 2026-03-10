"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            AI Tool Hub
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/tools"
              className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              ツール一覧
            </Link>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                ダッシュボード
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/tools?q="
            className="text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            aria-label="検索"
          >
            <Search size={20} />
          </Link>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                ログイン
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
              >
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

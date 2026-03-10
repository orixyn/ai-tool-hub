"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-tight"
          >
            AI Tool Hub
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/tools"
              className="text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              ツール一覧
            </Link>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
              >
                ダッシュボード
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/tools?q="
            className="text-muted transition-colors duration-200 hover:text-foreground"
            aria-label="検索"
          >
            <Search size={18} />
          </Link>

          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
              >
                ログイン
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background transition-opacity duration-200 hover:opacity-80"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

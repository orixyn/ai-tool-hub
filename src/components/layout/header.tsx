"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[14px] font-semibold tracking-tight"
          >
            <span className="inline-block h-2 w-2 rounded-sm bg-accent" />
            AI Tool Hub
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/tools"
              className="text-[13px] text-muted transition-colors duration-200 hover:text-accent"
            >
              ツール一覧
            </Link>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="text-[13px] text-muted transition-colors duration-200 hover:text-accent"
              >
                ダッシュボード
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/tools?q="
            className="text-muted transition-colors duration-200 hover:text-accent"
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
                className="btn-slide rounded-md border border-accent/40 px-3.5 py-1.5 text-[13px] font-medium text-accent transition-colors duration-200 hover:text-background active:scale-95"
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

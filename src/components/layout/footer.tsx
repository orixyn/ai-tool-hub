import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-mono text-[13px] font-medium text-foreground/80">
              <span className="text-accent">//</span> AI Tool Hub
            </p>
            <p className="mt-1 text-[12px] text-muted">
              &copy; {new Date().getFullYear()} AI Tool Hub
            </p>
          </div>
          <nav className="flex gap-8 text-[13px] text-muted">
            <Link
              href="/tools"
              className="transition-colors duration-200 hover:text-accent"
            >
              ツール一覧
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors duration-200 hover:text-accent"
            >
              ダッシュボード
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

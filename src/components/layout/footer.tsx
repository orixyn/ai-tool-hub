import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-[13px] font-medium">AI Tool Hub</p>
            <p className="mt-1 text-[12px] text-muted">
              &copy; {new Date().getFullYear()} AI Tool Hub
            </p>
          </div>
          <nav className="flex gap-8 text-[13px] text-muted">
            <Link
              href="/tools"
              className="transition-colors duration-200 hover:text-foreground"
            >
              ツール一覧
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors duration-200 hover:text-foreground"
            >
              ダッシュボード
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

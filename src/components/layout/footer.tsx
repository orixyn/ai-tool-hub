export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} AI Tool Hub
          </p>
          <nav className="flex gap-6 text-sm text-neutral-500">
            <a
              href="/tools"
              className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              ツール一覧
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

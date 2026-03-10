"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("category");

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/tools"
        className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
          !current
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        }`}
      >
        すべて
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/tools?category=${cat.slug}`}
          className={`rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
            current === cat.slug
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

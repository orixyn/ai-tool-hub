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
        className={`rounded-md px-3 py-1.5 text-[13px] transition-all duration-200 ${
          !current
            ? "bg-foreground text-background"
            : "bg-surface text-muted border border-border hover:text-foreground"
        }`}
      >
        すべて
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/tools?category=${cat.slug}`}
          className={`rounded-md px-3 py-1.5 text-[13px] transition-all duration-200 ${
            current === cat.slug
              ? "bg-foreground text-background"
              : "bg-surface text-muted border border-border hover:text-foreground"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

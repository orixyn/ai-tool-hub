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
        className={`rounded-md px-3 py-1.5 text-[13px] transition-all duration-200 active:scale-95 ${
          !current
            ? "border border-accent bg-accent/10 text-accent"
            : "border border-border text-muted hover:border-accent/30 hover:text-foreground"
        }`}
      >
        すべて
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/tools?category=${cat.slug}`}
          className={`rounded-md px-3 py-1.5 text-[13px] transition-all duration-200 active:scale-95 ${
            current === cat.slug
              ? "border border-accent bg-accent/10 text-accent"
              : "border border-border text-muted hover:border-accent/30 hover:text-foreground"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

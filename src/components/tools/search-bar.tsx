"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    params.delete("category");
    router.push(`/tools?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ツールを検索..."
        className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-4 font-mono text-[13px] outline-none transition-all duration-200 placeholder:text-muted/40 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)]"
      />
    </form>
  );
}

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
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ツールを検索..."
        className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-600"
      />
    </form>
  );
}

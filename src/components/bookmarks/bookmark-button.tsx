"use client";

import { useTransition, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/actions/bookmarks";

export function BookmarkButton({
  toolId,
  initialBookmarked,
}: {
  toolId: string;
  initialBookmarked: boolean;
}) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  function handleClick() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setIsBookmarked((prev) => !prev);

    startTransition(async () => {
      const result = await toggleBookmark(toolId);
      if (result.error) {
        setIsBookmarked((prev) => !prev);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-[13px] transition-all duration-200 active:scale-95 disabled:opacity-50 ${
        isBookmarked
          ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
          : "border-border text-muted hover:border-accent/30 hover:text-accent"
      }`}
    >
      <Bookmark
        size={16}
        className={isBookmarked ? "fill-cyan-500 text-cyan-500" : ""}
      />
      {isBookmarked ? "ブックマーク済み" : "ブックマーク"}
    </button>
  );
}

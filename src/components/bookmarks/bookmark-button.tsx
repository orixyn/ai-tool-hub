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
      className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-[13px] transition-all duration-200 hover:border-accent/30 disabled:opacity-50"
    >
      <Bookmark
        size={16}
        className={
          isBookmarked
            ? "fill-blue-500 text-blue-500"
            : "text-muted"
        }
      />
      {isBookmarked ? "ブックマーク済み" : "ブックマーク"}
    </button>
  );
}

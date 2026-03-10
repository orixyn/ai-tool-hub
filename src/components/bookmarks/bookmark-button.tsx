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
      className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm transition-colors duration-200 hover:border-neutral-400 disabled:opacity-50 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Bookmark
        size={18}
        className={
          isBookmarked
            ? "fill-blue-500 text-blue-500"
            : "text-neutral-500"
        }
      />
      {isBookmarked ? "ブックマーク済み" : "ブックマーク"}
    </button>
  );
}

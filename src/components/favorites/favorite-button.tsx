"use client";

import { useTransition, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/actions/favorites";

export function FavoriteButton({
  toolId,
  initialFavorited,
}: {
  toolId: string;
  initialFavorited: boolean;
}) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  function handleClick() {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setIsFavorited((prev) => !prev);

    startTransition(async () => {
      const result = await toggleFavorite(toolId);
      if (result.error) {
        setIsFavorited((prev) => !prev);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm transition-colors duration-200 hover:border-neutral-400 disabled:opacity-50 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Heart
        size={18}
        className={
          isFavorited
            ? "fill-red-500 text-red-500"
            : "text-neutral-500"
        }
      />
      {isFavorited ? "お気に入り済み" : "お気に入り"}
    </button>
  );
}

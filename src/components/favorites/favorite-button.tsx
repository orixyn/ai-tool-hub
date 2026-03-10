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
      className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-[13px] transition-all duration-200 hover:border-accent/30 disabled:opacity-50"
    >
      <Heart
        size={16}
        className={
          isFavorited
            ? "fill-red-500 text-red-500"
            : "text-muted"
        }
      />
      {isFavorited ? "お気に入り済み" : "お気に入り"}
    </button>
  );
}

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
      className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-[13px] transition-all duration-200 active:scale-95 disabled:opacity-50 ${
        isFavorited
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-border text-muted hover:border-accent/30 hover:text-accent"
      }`}
    >
      <Heart
        size={16}
        className={isFavorited ? "fill-red-500 text-red-500" : ""}
      />
      {isFavorited ? "お気に入り済み" : "お気に入り"}
    </button>
  );
}

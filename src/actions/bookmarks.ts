"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleBookmark(toolId: string, memo?: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "ログインが必要です" };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("tool_id", toolId)
    .single();

  if (existing) {
    await supabase.from("bookmarks").delete().eq("id", existing.id);
  } else {
    await supabase
      .from("bookmarks")
      .insert({ user_id: userId, tool_id: toolId, memo: memo ?? null });
  }

  revalidatePath(`/tools`);
  return { isBookmarked: !existing };
}

export async function checkBookmark(toolId: string) {
  const { userId } = await auth();
  if (!userId) return false;

  const supabase = await createClient();
  const { data } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("tool_id", toolId)
    .single();

  return !!data;
}

export async function updateBookmarkMemo(bookmarkId: string, memo: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "ログインが必要です" };
  }

  const supabase = await createClient();
  await supabase
    .from("bookmarks")
    .update({ memo, updated_at: new Date().toISOString() })
    .eq("id", bookmarkId)
    .eq("user_id", userId);

  revalidatePath("/dashboard/bookmarks");
}

export async function toggleBookmarkDone(bookmarkId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "ログインが必要です" };
  }

  const supabase = await createClient();

  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("is_done")
    .eq("id", bookmarkId)
    .eq("user_id", userId)
    .single();

  if (!bookmark) return { error: "ブックマークが見つかりません" };

  await supabase
    .from("bookmarks")
    .update({
      is_done: !bookmark.is_done,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bookmarkId)
    .eq("user_id", userId);

  revalidatePath("/dashboard/bookmarks");
}

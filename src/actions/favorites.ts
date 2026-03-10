"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleFavorite(toolId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "ログインが必要です" };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("tool_id", toolId)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
  } else {
    await supabase
      .from("favorites")
      .insert({ user_id: userId, tool_id: toolId });
  }

  revalidatePath(`/tools`);
  return { isFavorited: !existing };
}

export async function checkFavorite(toolId: string) {
  const { userId } = await auth();
  if (!userId) return false;

  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("tool_id", toolId)
    .single();

  return !!data;
}

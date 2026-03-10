"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Check, Trash2, Calendar } from "lucide-react";
import { toggleBookmark } from "@/actions/bookmarks";
import { toggleBookmarkDone, updateBookmarkMemo } from "@/actions/bookmarks";

type BookmarkWithTool = {
  id: string;
  tool_id: string;
  memo: string | null;
  is_done: boolean;
  due_date: string | null;
  created_at: string;
  tool_name: string;
  tool_slug: string;
};

export function BookmarkItem({ bookmark }: { bookmark: BookmarkWithTool }) {
  const [isPending, startTransition] = useTransition();
  const [isDone, setIsDone] = useState(bookmark.is_done);
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(bookmark.memo ?? "");
  const [isRemoved, setIsRemoved] = useState(false);

  function handleToggleDone() {
    setIsDone((prev) => !prev);
    startTransition(async () => {
      await toggleBookmarkDone(bookmark.id);
    });
  }

  function handleSaveMemo() {
    setIsEditing(false);
    startTransition(async () => {
      await updateBookmarkMemo(bookmark.id, memo);
    });
  }

  function handleRemove() {
    setIsRemoved(true);
    startTransition(async () => {
      await toggleBookmark(bookmark.tool_id);
    });
  }

  if (isRemoved) return null;

  return (
    <div
      className={`rounded-lg border border-neutral-200 p-4 transition-opacity dark:border-neutral-800 ${
        isDone ? "opacity-60" : ""
      } ${isPending ? "pointer-events-none opacity-50" : ""}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleDone}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
              isDone
                ? "border-green-500 bg-green-500 text-white"
                : "border-neutral-300 hover:border-neutral-500 dark:border-neutral-600"
            }`}
          >
            {isDone && <Check size={12} />}
          </button>
          <div>
            <Link
              href={`/tools/${bookmark.tool_slug}`}
              className={`font-medium transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 ${
                isDone ? "line-through" : ""
              }`}
            >
              {bookmark.tool_name}
            </Link>
            {bookmark.due_date && (
              <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                <Calendar size={12} />
                {new Date(bookmark.due_date).toLocaleDateString("ja-JP")}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="shrink-0 text-neutral-400 transition-colors hover:text-red-500"
          aria-label="削除"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isEditing ? (
        <div className="ml-8">
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-500"
            placeholder="メモを入力..."
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSaveMemo}
              className="rounded-lg bg-neutral-900 px-3 py-1 text-xs text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              保存
            </button>
            <button
              onClick={() => {
                setMemo(bookmark.memo ?? "");
                setIsEditing(false);
              }}
              className="rounded-lg px-3 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="ml-8">
          {memo ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-left text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {memo}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              メモを追加...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
      className={`corner-marks rounded-lg border border-border bg-surface p-4 transition-all duration-200 ${
        isDone ? "opacity-50" : ""
      } ${isPending ? "pointer-events-none opacity-30" : ""}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleDone}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200 active:scale-90 ${
              isDone
                ? "border-accent bg-accent text-background"
                : "border-border hover:border-accent/50"
            }`}
          >
            {isDone && <Check size={12} />}
          </button>
          <div>
            <Link
              href={`/tools/${bookmark.tool_slug}`}
              className={`text-[14px] font-medium transition-colors duration-200 hover:text-accent ${
                isDone ? "line-through" : ""
              }`}
            >
              {bookmark.tool_name}
            </Link>
            {bookmark.due_date && (
              <div className="mt-1 flex items-center gap-1 font-mono text-[11px] text-muted">
                <Calendar size={11} />
                {new Date(bookmark.due_date).toLocaleDateString("ja-JP")}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="shrink-0 text-border transition-colors duration-200 hover:text-red-400 active:scale-90"
          aria-label="削除"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {isEditing ? (
        <div className="ml-8">
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-[13px] outline-none transition-all duration-200 focus:border-accent/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.08)]"
            placeholder="メモを入力..."
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleSaveMemo}
              className="btn-slide rounded-md border border-accent/40 px-3 py-1 text-[12px] font-medium text-accent transition-colors duration-200 hover:text-background active:scale-95"
            >
              保存
            </button>
            <button
              onClick={() => {
                setMemo(bookmark.memo ?? "");
                setIsEditing(false);
              }}
              className="rounded-md px-3 py-1 text-[12px] text-muted transition-colors duration-200 hover:text-foreground"
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
              className="text-left text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              {memo}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="font-mono text-[12px] text-border transition-colors duration-200 hover:text-muted"
            >
              + メモを追加
            </button>
          )}
        </div>
      )}
    </div>
  );
}

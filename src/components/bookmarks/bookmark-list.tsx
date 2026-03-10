"use client";

import { BookmarkItem } from "./bookmark-item";

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

export function BookmarkList({
  bookmarks,
}: {
  bookmarks: BookmarkWithTool[];
}) {
  const pending = bookmarks.filter((b) => !b.is_done);
  const done = bookmarks.filter((b) => b.is_done);

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-medium text-neutral-500">
            未完了 ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((b) => (
              <BookmarkItem key={b.id} bookmark={b} />
            ))}
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-medium text-neutral-500">
            完了済み ({done.length})
          </h2>
          <div className="space-y-3">
            {done.map((b) => (
              <BookmarkItem key={b.id} bookmark={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Button from "@/components/ui/Button";
import { Memo } from "@/lib/memo/types";

type MemoListProps = {
  memos: Memo[];
  onDeleteMemo: (id: number) => void;
};

export default function MemoList({
  memos,
  onDeleteMemo,
}: MemoListProps) {
  if (memos.length === 0) {
    return (
      <p className="mt-10 text-sm text-zinc-500">
        No memos yet.
      </p>
    );
  }

  return (
    <div className="mt-10 space-y-4">
      {memos.map((memo) => (
        <div
          key={memo.id}
          className="
            rounded-2xl
            border border-orange-100
            bg-orange-50/50
            p-5
          "
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              {memo.title}
            </h2>

            <Button
              variant="danger"
              onClick={() =>
                onDeleteMemo(memo.id)
              }
            >
              Delete
            </Button>
          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-700">
            {memo.content}
          </p>
        </div>
      ))}
    </div>
  );
}

import { Memo } from "./types";

export function generateMemoId(
  memos: Memo[]
): number {
  return memos.length > 0
    ? Math.max(...memos.map((m) => m.id)) + 1
    : 1;
}
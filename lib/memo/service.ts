import { Memo } from "./types";
import { generateMemoId } from "./id";

export function createMemo(
  memos: Memo[],
  title: string,
  content: string
): Memo {
  return {
    id: generateMemoId(memos),
    title,
    content,
  };
}

export function isDuplicateTitle(
  memos: Memo[],
  title: string
): boolean {
  return memos.some(
    (memo) => memo.title === title
  );
}
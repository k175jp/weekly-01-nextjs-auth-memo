import { Memo } from "./types";

const STORAGE_KEY = "memos";

function getAllMemos(): Memo[] {
  const stored =
    localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveAllMemos(
  memos: Memo[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(memos)
  );
}

export function listMemos(): Memo[] {
  return getAllMemos();
}

export function addMemo(
  memo: Memo
): void {
  const memos = getAllMemos();

  saveAllMemos([memo, ...memos]);
}

export function deleteMemo(
  id: number
): void {
  const memos = getAllMemos();

  saveAllMemos(
    memos.filter((memo) => memo.id !== id)
  );
}
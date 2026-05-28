'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddMemoModal from "@/components/AddMemoModal";
import Button from "@/components/ui/Button";
import Header from "@/components/Header";
import MemoList from "@/components/MemoList";

import { Memo } from "@/lib/memo/types";
import { User } from "@/lib/auth/types";

import { listMemos, addMemo, deleteMemo } from "@/lib/memo/storage";
import { createMemo, isDuplicateTitle } from "@/lib/memo/service";
import { getCurrentUser, logout } from "@/lib/auth/storage";

export default function MemosPage() {
  const router = useRouter();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ memos, setMemos ] = useState<Memo[]>([]);
  const [ user, setUser ] = useState<User | null>(null);
  const [ isCheckingAuth, setIsCheckingAuth ] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setMemos(listMemos());
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setMemos([]);
    setTitle("");
    setContent("");
    router.replace("/login");
  };

  const handleAddMemo = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    if (isDuplicateTitle(memos, trimmedTitle)) {
      alert("Title already exists");
      return;
    }

    const newMemo = createMemo(
      memos,
      trimmedTitle,
      trimmedContent
    );

    addMemo(newMemo);

    setMemos(listMemos());
    setTitle("");
    setContent("");
    setIsModalOpen(false);
  };

  const handleDeleteMemo = (id: number) => {
    deleteMemo(id);

    setMemos(listMemos());
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-orange-100">
          <Header
            userEmail={user?.email}
            onLogout={handleLogout}
          />

          {isCheckingAuth && (
            <p className="mt-8 text-sm text-zinc-500">
              Checking login...
            </p>
          )}

          {!isCheckingAuth && user && (
            <>
              <div className="mt-8">
                <Button onClick={() => setIsModalOpen(true)}>
                  add memo
                </Button>
              </div>

              <AddMemoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onAddMemo={handleAddMemo}
              />

              <MemoList
                memos={memos}
                onDeleteMemo={handleDeleteMemo}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

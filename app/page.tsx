'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/storage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const redirectByAuth = async () => {
      const currentUser = await getCurrentUser();

      router.replace(
        currentUser ? "/memos" : "/login"
      );
    };

    redirectByAuth();
  }, [router]);

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-orange-100">
          <p className="text-sm text-zinc-500">
            Loading...
          </p>
        </div>
      </div>
    </main>
  );
}

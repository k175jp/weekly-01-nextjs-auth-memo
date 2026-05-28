'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Header from "@/components/Header";
import Input from "@/components/ui/Input";
import { getCurrentUser, login } from "@/lib/auth/storage";

export default function LoginPage() {
  const router = useRouter();
  const [ email, setEmail ] = useState("demo@example.com");
  const [ password, setPassword ] = useState("password");
  const [ authError, setAuthError ] = useState("");
  const [ isCheckingAuth, setIsCheckingAuth ] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        router.replace("/memos");
        return;
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  const handleLogin = async () => {
    const isLoggedIn = await login(
      email.trim(),
      password
    );

    if (!isLoggedIn) {
      setAuthError("Email or password is incorrect");
      return;
    }

    router.replace("/memos");
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-orange-100">
          <Header />

          {isCheckingAuth && (
            <p className="mt-8 text-sm text-zinc-500">
              Checking login...
            </p>
          )}

          {!isCheckingAuth && (
            <div className="mt-8 space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              {authError && (
                <p className="text-sm text-red-500">
                  {authError}
                </p>
              )}

              <Button onClick={handleLogin}>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

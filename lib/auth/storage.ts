import { createJwt, verifyJwt } from "./jwt";
import { User } from "./types";

const AUTH_TOKEN_KEY = "auth_token";
const DEMO_USER = {
  id: "demo-user",
  email: "demo@example.com",
  password: "password",
  name: "Demo User",
};

export async function login(
  email: string,
  password: string
): Promise<boolean> {
  if (
    email !== DEMO_USER.email ||
    password !== DEMO_USER.password
  ) {
    return false;
  }

  const token = await createJwt({
    sub: DEMO_USER.id,
    email: DEMO_USER.email,
    name: DEMO_USER.name,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  });

  localStorage.setItem(AUTH_TOKEN_KEY, token);

  return true;
}

export function logout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return null;
  }

  const payload = await verifyJwt(token);

  if (!payload) {
    logout();
    return null;
  }

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
  };
}

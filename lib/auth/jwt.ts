import { AuthTokenPayload } from "./types";

const JWT_SECRET = "weekly-01-local-demo-secret";
const encoder = new TextEncoder();

function base64UrlEncode(value: string): string {
  return btoa(value)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(value: string): string {
  const base64 = value
    .replaceAll("-", "+")
    .replaceAll("_", "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");

  return atob(base64);
}

async function createSignature(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );

  const bytes = Array.from(new Uint8Array(signature));
  const text = String.fromCharCode(...bytes);

  return base64UrlEncode(text);
}

export async function createJwt(
  payload: AuthTokenPayload
): Promise<string> {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64UrlEncode(
    JSON.stringify(header)
  );
  const encodedPayload = base64UrlEncode(
    JSON.stringify(payload)
  );
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await createSignature(unsignedToken);

  return `${unsignedToken}.${signature}`;
}

export async function verifyJwt(
  token: string
): Promise<AuthTokenPayload | null> {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = await createSignature(unsignedToken);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      base64UrlDecode(encodedPayload)
    ) as AuthTokenPayload;

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

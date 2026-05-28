export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthTokenPayload = {
  sub: string;
  email: string;
  name: string;
  exp: number;
};

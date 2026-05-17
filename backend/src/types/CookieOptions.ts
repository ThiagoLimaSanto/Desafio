import { CookieSerializeOptions } from "@fastify/cookie";

export const cookieOptions: CookieSerializeOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  secure: false,
};
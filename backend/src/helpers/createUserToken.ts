import { FastifyReply } from "fastify";
import { cookieOptions } from "../types/CookieOptions";

export async function tokenGenerate(
  reply: FastifyReply,
  id: string,
  name: string,
  role: string,
) {
  const token = await reply.jwtSign({ id, name, role }, { expiresIn: "7d" });

  const tempoVida = 60 * 60 * 24 * 7;

  reply.setCookie("token", token, {
    ...cookieOptions,
    maxAge: tempoVida,
  });

  return token;
}

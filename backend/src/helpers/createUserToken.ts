import { FastifyReply } from "fastify";
import { cookieOptions } from "../types/CookieOptions";
import { userRole } from "../types/User";

export async function tokenGenerate(
  reply: FastifyReply,
  id: string,
  name: string,
  role: userRole,
) {
  const token = await reply.jwtSign({ id, name, role }, { expiresIn: "7d" });

  const tempoVida = 60 * 60 * 24 * 7;

  reply.setCookie("token", token, {
    ...cookieOptions,
    maxAge: tempoVida,
  });

  return token;
}

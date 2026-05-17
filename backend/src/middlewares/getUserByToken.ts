import "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import { userRole } from "../types/User";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      name?: string;
      role?: userRole;
    };
    user: {
      id: string;
      name?: string;
      role?: userRole;
    };
  }
}

export async function getUserByToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Não autorizado!" });
  }
}

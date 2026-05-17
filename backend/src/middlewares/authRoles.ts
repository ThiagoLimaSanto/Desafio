import { FastifyReply, FastifyRequest } from "fastify";
import { userRole } from "../types/User";

export function authRoles(allowedRoles: userRole[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const role = request.user?.role;

    if (!role) {
      return reply.status(401).send({ message: "Não autenticado." });
    }

    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: "Nao autorizado!" });
    }

    return;
  };
}

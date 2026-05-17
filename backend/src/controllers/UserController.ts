import { FastifyReply, FastifyRequest } from "fastify";
import { tokenGenerate } from "../helpers/createUserToken";
import { UserService } from "../services/UserService";
import { cookieOptions } from "../types/CookieOptions";
import { UserLogin, UserSchema } from "../types/User";

const service = new UserService();

export class UserController {
  async checkAuth(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user;

    const data = await service.checkAuth(user);

    return reply.status(200).send({ message: "Autenticado!", data });
  }
  async create(
    request: FastifyRequest<{
      Body: UserSchema;
    }>,
    reply: FastifyReply,
  ) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return reply.status(400).send({ message: "Dados obrigatorio!" });
    }

    const user = await service.create({ name, email, password });

    return reply.status(200).send(user);
  }

  async Login(
    request: FastifyRequest<{ Body: UserLogin }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body;

    const user = await service.login({ email, password });

    const token = await tokenGenerate(
      reply,
      user.user.id,
      user.user.name,
      user.user.role,
    );

    return reply.status(200).send({ token, data: user });
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie("token", {
      ...cookieOptions,
    });

    return reply.status(200).send({ message: "Saiu!" });
  }
}

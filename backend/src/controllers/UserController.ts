import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/UserService";
import { UserSchema } from "../types/User";

const service = new UserService();

export class UserController {
  async create(
    request: FastifyRequest<{
      Body: UserSchema;
    }>,
    reply: FastifyReply,
  ) {
    const { name, email, password } = request.body;

    const user = await service.create({ name, email, password });

    return reply.status(200).send(user);
  }
}

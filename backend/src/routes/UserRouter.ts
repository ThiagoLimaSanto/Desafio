import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
const userController = new UserController();

export async function UserRouter(app: FastifyInstance) {
  app.post(
    "/cadastrar",
    {
      preHandler: [],
      schema: {
        body: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: { type: "string", enum: ["ADMIN", "USER"] },
          },
        },
        response: 201,
      },
    },
    userController.create.bind(userController),
  );
}

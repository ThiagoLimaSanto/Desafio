import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { authGuard } from "../middlewares/auth.middleware";
const userController = new UserController();

export async function UserRouter(app: FastifyInstance) {
  app.get(
    "/checkAuth",
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    userController.checkAuth.bind(userController),
  );

  app.post(
    "/cadastrar",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: 201,
      },
    },
    userController.create.bind(userController),
  );

  app.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: 200,
      },
    },
    userController.Login.bind(userController),
  );

  app.post(
    "/logout",
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    userController.logout.bind(userController),
  );
}

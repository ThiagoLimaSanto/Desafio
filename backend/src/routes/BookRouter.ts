import { FastifyInstance } from "fastify";
import { BookController } from "../controllers/BookController";
import { authGuard } from "../middlewares/auth.middleware";
import { authRoles } from "../middlewares/authRoles";
import { userRole } from "../types/User";
const bookController = new BookController();

export async function BookRouter(app: FastifyInstance) {
  app.get(
    "/obter",
    {
      preHandler: [authGuard, authRoles([userRole.ADMIN, userRole.USER])],
      schema: {
        response: 200,
      },
    },
    bookController.getAllBooks.bind(bookController),
  );

  app.post(
    "/cadastrar",
    {
      preHandler: [authGuard, authRoles([userRole.ADMIN])],
      schema: {
        body: {
          type: "object",
          required: ["titulo", "autor", "genero", "ano", "estoque"],
          properties: {
            titulo: { type: "string" },
            autor: { type: "string" },
            genero: { type: "string" },
            ano: { type: "number" },
            estoque: { type: "number" },
          },
        },
        response: 201,
      },
    },
    (request, reply) => bookController.createBook(request as any, reply),
  );

  app.patch(
    "/update/:id",
    {
      preHandler: [authGuard, authRoles([userRole.ADMIN])],
      schema: {
        body: {
          type: "object",
          required: ["titulo", "autor", "genero", "ano", "estoque"],
          properties: {
            titulo: { type: "string" },
            autor: { type: "string" },
            genero: { type: "string" },
            ano: { type: "number" },
            estoque: { type: "number" },
          },
        },
        response: 200,
      },
    },
    (request, reply) => bookController.updateBook(request as any, reply),
  );

  app.patch(
    "/delete/:id",
    {
      preHandler: [authGuard, authRoles([userRole.ADMIN])],
      schema: {
        response: 200,
      },
    },
    (request, reply) => bookController.deleteBook(request as any, reply),
  );

  app.patch(
    "/removestock/:id",
    {
      preHandler: [authGuard, authRoles([userRole.ADMIN, userRole.USER])],
      schema: {
        response: 200,
      },
    },
    (request, reply) => bookController.removeBookStock(request as any, reply),
  );
}

import { FastifyInstance } from "fastify";
import { BookController } from "../controllers/BookController";
import { authGuard } from "../middlewares/auth.middleware";
const bookController = new BookController();

export async function BookRouter(app: FastifyInstance) {
  app.get(
    "/obter",
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    bookController.getAllBooks.bind(bookController),
  );

  app.post(
    "/cadastrar",
    {
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
    bookController.createBook.bind(bookController),
  );

  app.patch(
    "/update/:id",
    {
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
    bookController.updateBook.bind(bookController),
  );

  app.patch(
    "/delete/:id",
    {
      preHandler: [authGuard],
      schema: {
        response: 200,
      },
    },
    (request, reply) => bookController.deleteBook(request as any, reply),
  );
}

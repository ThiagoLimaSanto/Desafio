import { FastifyReply, FastifyRequest } from "fastify";
import { publishBookCreated } from "../kafka/producer";
import { BookService } from "../services/BookService";
import { BookSchema } from "../types/Book";

const service = new BookService();
export class BookController {
  async getAllBooks(request: FastifyRequest, reply: FastifyReply) {
    const books = await service.getAllBooks();
    return reply.status(200).send(books);
  }

  async createBook(
    request: FastifyRequest<{
      Body: BookSchema;
    }>,
    reply: FastifyReply,
  ) {
    const { titulo, autor, genero, ano, estoque } = request.body;

    const book = await service.createBook({
      titulo,
      autor,
      genero,
      ano,
      estoque,
    });

    try {
      await publishBookCreated({
        bookId: book.id,
        title: book.titulo,
      });
    } catch (error) {
      console.error("Erro ao publicar evento BOOK_CREATED:", error);
    }

    return reply.status(201).send(book);
  }

  async updateBook(
    request: FastifyRequest<{ Body: BookSchema; Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { titulo, autor, genero, ano, estoque } = request.body;

    const book = await service.updateBook(id, {
      titulo,
      autor,
      genero,
      ano,
      estoque,
    });

    return reply.status(200).send(book);
  }

  async deleteBook(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    const book = await service.deleteBook(id);

    return reply.status(200).send(book);
  }

  async removeBookStock(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;

    const book = await service.removeBookStock(id);

    return reply.status(200).send(book);
  }
}

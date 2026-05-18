import { isValidObjectId } from "mongoose";
import { AppError } from "../errors/AppError";
import { Book } from "../models/BooksModel";
import { BookSchema } from "../types/Book";

export class BookService {
  async getAllBooks() {
    const result = await Book.aggregate([
      {
        $match: { active: true },
      },
      {
        $facet: {
          books: [
            {
              $project: {
                _id: 1,
                titulo: 1,
                autor: 1,
                genero: 1,
                ano: 1,
                estoque: 1,
              },
            },
          ],

          totalBooks: [{ $count: "count" }],

          totalStock: [
            {
              $group: {
                _id: null,
                total: { $sum: "$estoque" },
              },
            },
          ],
        },
      },
    ]);

    return {
      books: result[0].books,
      totalBooks: result[0].totalBooks[0]?.count || 0,
      totalStock: result[0].totalStock[0]?.total || 0,
    };
  }

  async createBook(book: BookSchema) {
    const newBook = await Book.create(book);
    return newBook;
  }

  async updateBook(id: string, book: BookSchema) {
    if (!isValidObjectId(id)) throw new AppError("Id invalido", 400);
    const oldBook = await Book.findById(id);
    if (!oldBook) throw new AppError("Livro nao encontrado", 404);
    const newBook = await Book.findByIdAndUpdate(id, book);
    return newBook;
  }

  async deleteBook(id: string) {
    if (!isValidObjectId(id)) throw new AppError("Id invalido", 400);
    const newBook = await Book.findByIdAndUpdate(id, { active: false });
    return newBook;
  }

  async removeBookStock(id: string) {
    if (!isValidObjectId(id)) throw new AppError("Id invalido", 400);

    const book = await Book.findById(id);
    if (!book) throw new AppError("Livro não encontrado", 404);

    if (book.estoque <= 0) throw new AppError("Livro sem estoque", 400);

    book.estoque = book.estoque - 1;

    const updated = await book.save();

    return updated;
  }
}

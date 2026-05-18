export type BookSchema = {
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  estoque: number;
};

export type UpdateBookInput = {
  _id: string;
} & BookSchema;

export type Book = {
  books: UpdateBookInput[];
  totalBooks: number;
  totalStock: number;
};

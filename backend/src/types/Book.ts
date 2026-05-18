export type BookSchema = {
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  estoque: number;
};

export type Book = BookSchema & { id: string };
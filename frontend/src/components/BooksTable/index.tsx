import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  useDeleteBooks,
  useGetAllBooks,
  usePutBooks,
} from "../../hooks/useBooks";

import type { UpdateBookInput } from "../../types/Book";
import { FormBooks } from "../FormBooks";
import { Modal } from "../Modal";
import styles from "./table.module.css";

export function BooksTable() {
  const { mutate: deleteBook } = useDeleteBooks();
  const { mutate: putBook } = usePutBooks();
  const { data, isLoading } = useGetAllBooks();
  const [open, setOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState<UpdateBookInput>({
    _id: "",
    titulo: "",
    autor: "",
    genero: "",
    ano: 0,
    estoque: 0,
  });

  const handleSubmit = () => {
    putBook(selectedBook);
    setOpen(false);
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data?.books.map((book) => (
            <tr key={book._id}>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.genero}</td>
              <td>{book.ano}</td>
              <td>{book.estoque}</td>
              <td className={styles.actions}>
                <FiEdit
                  onClick={() => {
                    setSelectedBook(book);
                    setOpen(true);
                  }}
                />

                <FiTrash2
                  onClick={() => deleteBook(book._id)}
                  className={styles.delete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} setOpen={setOpen}>
        <FormBooks
          title="Editar Livro"
          book={selectedBook}
          setBook={setSelectedBook}
          handleSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}

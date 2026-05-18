import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { CatalogBooks } from "../../components/CatalogBooks";
import { FormBooks } from "../../components/FormBooks";
import { InfoBooks } from "../../components/InfoBooks";
import { Modal } from "../../components/Modal";
import { NavBar } from "../../components/NavBar";
import { usePostBooks } from "../../hooks/useBooks";
import type { BookSchema } from "../../types/Book";
import styles from "./admin.module.css";

export function AdminPages() {
  const { mutate: post } = usePostBooks();
  const [open, setOpen] = useState(false);

  const handleSubmit = (book: BookSchema) => {
    post(book);
    setOpen(false);
  };
  return (
    <>
      <NavBar role="Página do Admin" />
      <div className={styles.fundo}>
        <div className={styles.adminContainer}>
          <div className={styles.action}>
            <button
              onClick={() => setOpen(true)}
              className={styles.button + " " + styles.cadastrar}
            >
              <FiPlus color="#fff" size={20} />
              Novo Livro
            </button>
          </div>
          <InfoBooks />
          <CatalogBooks />
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormBooks
          title="Novo Livro"
          handleSubmit={() => handleSubmit}
          book={{}}
        />
      </Modal>
    </>
  );
}

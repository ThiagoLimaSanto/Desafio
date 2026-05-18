import { FiSearch } from "react-icons/fi";
import { BooksTable } from "../BooksTable";
import styles from "./catalog.module.css";

export function CatalogBooks() {
  return (
    <div className={styles.catalog}>
      <div className={styles.searchContainer}>
        <div className={styles.title}>
          <h2 className={styles.titleSearch}>Catálogo</h2>
          <p className={styles.subtitle}>Cadastre, edite e remava livros</p>
        </div>
        <div className={styles.search}>
          <FiSearch size={20} />
          <input
            className={styles.input}
            type="text"
            placeholder="Buscar por título, autor ou gênero"
          />
        </div>
      </div>
      <BooksTable />
    </div>
  );
}

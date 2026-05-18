import { BooksTable } from "../BooksTable";
import styles from "./catalog.module.css";

export function CatalogBooks() {
  return (
    <div className={styles.catalog}>
      <div className={styles.searchContainer}>
        <div className={styles.title}>
          <h2 className={styles.titleSearch}>Catálogo</h2>
          <p className={styles.subtitle}>Cadastre, edite e remove livros</p>
        </div>
      </div>
      <BooksTable />
    </div>
  );
}

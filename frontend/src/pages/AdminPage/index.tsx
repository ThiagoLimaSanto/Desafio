import { FiPlus } from "react-icons/fi";
import { CatalogBooks } from "../../components/CatalogBooks";
import { InfoBooks } from "../../components/InfoBooks";
import { NavBar } from "../../components/NavBar";
import styles from "./admin.module.css";

export function AdminPages() {
  return (
    <>
      <NavBar role="Página do Admin" />
      <div className={styles.fundo}>
        <div className={styles.adminContainer}>
          <div className={styles.action}>
            <button className={styles.button + " " + styles.cadastrar}>
              <FiPlus color="#fff" size={20} />
              Novo Livro
            </button>
          </div>
          <InfoBooks />
          <CatalogBooks />
        </div>
      </div>
    </>
  );
}

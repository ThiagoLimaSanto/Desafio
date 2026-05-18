import { FiEdit, FiTrash2 } from "react-icons/fi";
import styles from "./table.module.css";

export function BooksTable() {
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
          <tr>
            <td>Dom Casmurro</td>
            <td>Machado de Assis</td>
            <td><span className={styles.badge}>Romance</span></td>
            <td>1899</td>
            <td>12</td>
            <td className={styles.actions}>
              <FiEdit />
              <FiTrash2 className={styles.delete} />
            </td>
          </tr>

          <tr>
            <td>1984</td>
            <td>George Orwell</td>
            <td><span className={styles.badge}>Distopia</span></td>
            <td>1949</td>
            <td>7</td>
            <td className={styles.actions}>
              <FiEdit />
              <FiTrash2 className={styles.delete} />
            </td>
          </tr>

          <tr>
            <td>O Hobbit</td>
            <td>J.R.R. Tolkien</td>
            <td><span className={styles.badge}>Fantasia</span></td>
            <td>1937</td>
            <td>4</td>
            <td className={styles.actions}>
              <FiEdit />
              <FiTrash2 className={styles.delete} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
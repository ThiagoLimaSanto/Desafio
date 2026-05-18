import { useGetAllBooks } from "../../hooks/useBooks";
import styles from "./info.module.css";

export function InfoBooks() {
  const { data, isLoading } = useGetAllBooks();

  if (isLoading) return <p>Carregando...</p>;
  return (
    <div className={styles.info}>
      <div className={styles.item}>
        <h2 className={styles.titleItem}>Lista de Livros</h2>
        <p className={styles.quantItem}>{data?.totalBooks}</p>
      </div>
      <div className={styles.item}>
        <h2 className={styles.titleItem}>Estoque de Livros</h2>
        <p className={styles.quantItem}>{data?.totalStock}</p>
      </div>
    </div>
  );
}

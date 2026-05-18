import styles from "./info.module.css";

export function InfoBooks() {
  return (
    <div className={styles.info}>
      <div className={styles.item}>
        <h2 className={styles.titleItem}>Lista de Livros</h2>
        <p className={styles.quantItem}>3</p>
      </div>
      <div className={styles.item}>
        <h2 className={styles.titleItem}>Estoque de Livros</h2>
        <p className={styles.quantItem}>25</p>
      </div>
    </div>
  );
}

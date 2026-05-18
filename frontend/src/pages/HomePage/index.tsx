import { NavBar } from "../../components/NavBar";
import { useGetAllBooks, useRemoveStock } from "../../hooks/useBooks";
import styles from "./home.module.css";

export function Home() {
  const { data, isLoading } = useGetAllBooks();
  const { mutate: removestock } = useRemoveStock();

  if (isLoading) return <p>Carregando...</p>;

  console.log(data);

  return (
    <main className={styles.fundo}>
      <NavBar role="Catálogo de Livros" />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Encontre seu próximo livro</h1>
          <p className={styles.p}>
            Explore o acervo, escolha um título e retire.
          </p>
        </div>
        <div className={styles.card}>
          {Array.isArray(data?.books) && data.books.length > 0 ? (
            data.books.map((book) => (
              <div key={book._id} className={styles.cardItem}>
                <div className={styles.main}>
                  <div>
                    <h2>{book.titulo}</h2>
                    <p className={styles.autor}>
                      {book.autor} - {book.ano}
                    </p>
                  </div>
                  <p className={styles.genero}>{book.genero}</p>
                </div>
                <div className={styles.stockContainer}>
                  <p className={styles.stock}>{book.estoque} disponiveis</p>
                  <button
                    onClick={() => removestock(book._id)}
                    className={styles.button}
                  >
                    Retirar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum livro cadastrado.</p>
          )}
        </div>
      </div>
    </main>
  );
}

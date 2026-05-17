import styles from "./login.module.css";

type MainLoginTemplateProps = {
  children: React.ReactNode;
  textButton: string;
  textLink: string;
  link: string;
  handleSubmit: () => void;
};

export function MainLoginTemplate({
  textButton,
  textLink,
  children,
  link,
  handleSubmit,
}: MainLoginTemplateProps) {
  return (
    <div className={styles.fundo}>
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <img
            className={styles.image}
            src="./login.webp"
            alt="Tela de Login"
          />
        </div>
        <div className={styles.containerForm}>
          <h1 className={styles.title}>Bem Vindo!</h1>
          {children}
          <span className={styles.span}>
            {textLink}{" "}
            <a className={styles.link} href={link}>
              Clique aqui.
            </a>
          </span>
          <button onClick={() => handleSubmit()} className={styles.buttonLogin}>
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
}

import { Input } from "../../components/Input";
import styles from "./login.module.css";

export function LoginPage() {
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
          <form method="POST" className={styles.form}>
            <Input
              id="email"
              type="email"
              placeholder="Digite o seu e-mail"
              labelText="Email"
            />
            <Input
              id="password"
              type="password"
              placeholder="Digite a sua senha"
              labelText="Senha"
            />
          </form>
          <span className={styles.span}>
            Não tem uma conta? <a className={styles.link} href="/register">Crie uma.</a>
          </span>
          <button className={styles.buttonLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

import styles from "./form.module.css";

type FormProps = {
  children: React.ReactNode;
};

export function MainForm({ children }: FormProps) {
  return <form className={styles.form}>{children}</form>;
}

import styles from "./form.module.css";

type FormProps = {
  children: React.ReactNode;
  title?: string;
  handleSubmit: () => void;
};

export function MainForm({ children, title, handleSubmit }: FormProps) {
  return (
    <>
      {title && <h1 className={styles.title}>{title}</h1>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={styles.form}
      >
        {children}

        <button type="submit" className={styles.button}>
          {title}
        </button>
      </form>
    </>
  );
}

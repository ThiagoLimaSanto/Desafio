type InputsProps = {
  type: string;
  id: string;
  labelText: string;
  classNameLabel?: string;
  classNameInput?: string;
} & React.ComponentProps<"input">;
import styles from "./input.module.css";

export function Input({ type, id, labelText, ...rest }: InputsProps) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <input type={type} className={styles.input} {...rest} id={id} name={id} />
    </div>
  );
}

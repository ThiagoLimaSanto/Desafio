import styles from "./modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function Modal({ children, open, setOpen }: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <p className={styles.close} onClick={() => setOpen(false)}>
          X
        </p>
        {children}
      </div>
    </div>
  );
}

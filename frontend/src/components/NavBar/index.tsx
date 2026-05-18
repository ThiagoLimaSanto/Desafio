import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import styles from "./nav.module.css";

interface NavBarProps {
  role: string;
}

export function NavBar({ role }: NavBarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <h1 className={styles.title}>{role}</h1>
        <div className={styles.userContainer}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Olá, {user?.name}</p>
          </div>
          <button className={styles.avatar}>
            <HiOutlineUser />
          </button>
          <button onClick={() => logout()} className={styles.logout}>
            <HiOutlineLogout size={25} />
          </button>
        </div>
      </div>
    </nav>
  );
}

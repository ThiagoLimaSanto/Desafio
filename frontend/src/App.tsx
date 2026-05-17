import { Outlet } from "react-router-dom";
import styles from "./global.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
}

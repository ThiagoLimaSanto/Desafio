import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/infra/AuthProvider";
import styles from "./global.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

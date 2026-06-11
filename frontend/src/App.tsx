import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/infra/AuthProvider";
import styles from "./global.module.css";
import { NotificationListener } from "./websocket/NotificationListener";

export function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <NotificationListener />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

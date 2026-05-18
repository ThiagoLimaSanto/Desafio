import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { AdminPages } from "../pages/AdminPage";
import { Home } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/registerPage";
import { ProtectedRoute } from "./ProtectRoute";
import { RoleRoute } from "./RoleRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            element: <RoleRoute allowedRoles={["ADMIN"]} />,
            children: [
              {
                path: "admin",
                element: <AdminPages />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

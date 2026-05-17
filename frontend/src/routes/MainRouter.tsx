import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/registerPage";

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
    ],
  },
]);

import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import LoginAdmin from "../pages/auth/admin/Login/Login";
import RegisterAdmin from "../pages/auth/admin/Register/Register";
import Login from "../pages/auth/user/Login/Login";
import Register from "../pages/auth/user/Register/Register";

const AuthRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "admin/login", element: <LoginAdmin /> },
    { path: "admin/register", element: <RegisterAdmin /> },
  ],
};

export default AuthRoutes;

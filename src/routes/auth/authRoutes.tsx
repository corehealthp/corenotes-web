import Login from "src/pages/Auth/Login";
import ForgotPassword from "src/pages/Auth/ForgotPassword/forgotpassword";
import { routerType } from "src/routes/types";
import ResetPassword from "src/pages/Auth/ResetPassword/resetPassword";

const AuthRoutes: routerType[] = [
  {
    path: "/",
    title: "Login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    title: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    title: "reset-password/:token",
    element: <ResetPassword />,
  },

];

export default AuthRoutes;

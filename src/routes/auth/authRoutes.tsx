import Login from "src/pages/Auth/Login";
import ForgotPassword from "src/pages/Auth/ForgotPassword/forgotpassword";
import { routerType } from "src/routes/types";
import ForgotUserName from "src/pages/Auth/ForgotUserName/forgotUserName";

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
    path: "/forgot-username",
    title: "forgot-username",
    element: <ForgotUserName />,
  },

];

export default AuthRoutes;

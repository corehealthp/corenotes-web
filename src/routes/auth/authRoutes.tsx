import Login from "src/pages/Auth/Login";
import { routerType } from "src/routes/types";

const AuthRoutes:routerType[] = [
    {
        path:'/',
        title: 'Login',
        element: <Login />
    }
]

export default AuthRoutes;
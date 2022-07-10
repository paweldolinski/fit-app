import { Outlet } from "react-router";
import Login from "../pages/Login";

const useAuth =()=> {
    const userInfo = localStorage.getItem("userInfo");

    return userInfo
}

const ProtectedRoutes =()=> {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes

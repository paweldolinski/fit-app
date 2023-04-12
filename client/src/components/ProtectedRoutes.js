import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => localStorage.getItem("token");
// zrobic autentykacje na podstawie JWT

const ProtectedRoutes = ({ children }) => {
  const isValid = useAuth();

  return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

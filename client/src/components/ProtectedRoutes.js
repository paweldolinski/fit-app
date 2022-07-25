import { Navigate, useLocation } from "react-router-dom";

const useAuth = () => localStorage.getItem("userInfo");
// zrobic autentykacje na podstawie JWT

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const isValid = useAuth();

  if (!isValid) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoutes;

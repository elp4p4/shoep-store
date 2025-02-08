// frontend/src/components/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

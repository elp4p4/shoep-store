import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default LoggedInRoute;

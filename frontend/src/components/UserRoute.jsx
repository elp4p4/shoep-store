import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  // Allow access only if user is logged in AND not admin
  return userInfo && !userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default UserRoute;

// components/AdminRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  // Check both existence and admin status
  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Use Outlet to render child routes
  return <Outlet />;
};

export default AdminRoute;

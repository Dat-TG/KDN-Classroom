import { Navigate, Outlet } from "react-router-dom";
import { sGetUserInfo } from "../store/user/selector";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const user = useSelector(sGetUserInfo);
  if (user == null) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;

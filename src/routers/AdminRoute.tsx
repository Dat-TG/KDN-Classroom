import { Navigate, Outlet } from "react-router-dom";
import { sGetUserInfo } from "../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../store";
import { getUserProfile } from "../store/user/thunkApi";
import { USER_ROLES_NAME, UserRoles, UserRolesEnum } from "../types/user";
import AccessDeinedPage from "../pages/AccessDeniedPage";

function AdminRoute() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const user = useSelector(sGetUserInfo);
  console.log(user);
  if (user == null && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }
  if (
    !localStorage.getItem("accessToken") &&
    !user?.roles.includes({
      id: UserRolesEnum.ADMIN,
      name: USER_ROLES_NAME.ADMIN,
    } as UserRoles)
  ) {
    return <AccessDeinedPage />;
  }
  return <Outlet />;
}

export default AdminRoute;

import { Navigate, Outlet } from "react-router-dom";
import { sGetUserInfo } from "../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import { getUserProfile } from "../store/user/thunkApi";
import { USER_ROLES_NAME, UserRolesEnum } from "../types/user";
import AccessDeinedPage from "../pages/AccessDeniedPage";

function AdminRoute() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const user = useSelector(sGetUserInfo);
  useEffect(() => {
    for (const i of user?.roles ?? []) {
      if (i.id == UserRolesEnum.ADMIN && i.name == USER_ROLES_NAME.ADMIN) {
        setIsAdmin(true);
        break;
      }
    }
  }, [user]);
  if (user == null && !localStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <AccessDeinedPage />;
  }
  return <Outlet />;
}

export default AdminRoute;

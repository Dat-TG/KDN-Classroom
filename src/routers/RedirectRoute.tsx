import { Navigate, Outlet } from "react-router-dom";
import { sGetUserInfo } from "../store/user/selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../store";
import { getUserProfile } from "../store/user/thunkApi";

function RedirectRoute() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = useSelector(sGetUserInfo);
  if (user !== null) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default RedirectRoute;

// MainLayout.tsx
import { useState } from "react";
import Sidebar from "./SideBar";

import Appbar from "./AppBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../store/user/thunkApi";
import toast from "../../utils/toast";
import { useTranslation } from "react-i18next";
import ConsecutiveSnackbars from "./Snackbar";

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(sGetUserInfo);

  const navigate = useNavigate();

  const { t } = useTranslation("global");

  const onLogout = async () => {
    const res = await dispatch(logoutUser());
    if (res.meta.requestStatus == "fulfilled") {
      toast.success(t("logoutSuccessfully"));
      setTimeout(() => {
        navigate(0);
      }, 1000);
    }
  };

  return (
    <>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={user != null}
        onLogout={onLogout}
      />
      <div style={{ display: "flex" }}>
        {user != null && <Sidebar open={isSidebarOpen} />}
        <main
          style={{ flex: 1, transition: "margin-left 0.3s", marginTop: "64px" }}
        >
          <Outlet />
        </main>
      </div>

      <ConsecutiveSnackbars />
    </>
  );
}

export default UserLayout;

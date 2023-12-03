// MainLayout.tsx
import { useEffect, useState } from "react";
import Sidebar from "./SideBar";

import Appbar from "./AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import { AppDispatch } from "../../store";
import { getUserProfile, logoutUser } from "../../store/user/thunkApi";

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector(sGetUserInfo);

  console.log(user);

  return (
    <>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={user != null}
        onLogout={() => dispatch(logoutUser({}))}
      />
      <div style={{ display: "flex" }}>
        {user != null && <Sidebar open={isSidebarOpen} />}
        <main
          style={{ flex: 1, transition: "margin-left 0.3s", marginTop: "64px" }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default UserLayout;

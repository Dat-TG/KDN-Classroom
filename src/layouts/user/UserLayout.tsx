// MainLayout.tsx
import { useState } from "react";
import Sidebar from "./SideBar";

import Appbar from "./AppBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
//import { useUser } from "../../../hooks/useUser";
//import { AuthContext } from "../../../context/AuthContext";

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const user = useSelector(sGetUserInfo);

  console.log(user);

  //const { user } = useContext(AuthContext);

  //const { logout } = useUser();

  return (
    <>
      <Appbar
        toggleSidebar={toggleSidebar}
        isLoggedIn={user != null}
        onLogout={/*logout*/ () => {}}
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

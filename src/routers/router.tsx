import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import HomePage from "../pages/HomePage";
import AdminLayout from "../layouts/admin/AdminLayout";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPage from "../pages/ForgotPasswordPage";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path: "/forgotten",
        element: <ForgotPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/calendar",
        element: <div>Calendar</div>,
      },
      {
        path: "/todo",
        element: <div>To-do</div>,
      },
      {
        path: "/course/:courseId",
        element: <div>Course</div>,
      },
      {
        path: "/archived",
        element: <div>Archived class</div>,
      },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "classes",
        element: <div>Classes management</div>,
      },
      {
        path: "users",
        element: <div>Users management</div>,
      },
      {
        path: "settings",
        element: <div>Settings</div>,
      },
    ],
  },
]);

export default router;

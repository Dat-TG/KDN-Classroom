import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";
import HomePage from "../pages/HomePage";
import AdminLayout from "../layouts/admin/AdminLayout";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import RedirectRoute from "./RedirectRoute";
import LandingPage from "../pages/LandingPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AdminRoute from "./AdminRoute";
import ClassDetailsPage from "../pages/ClassDetailsPage";
import AcceptInvite from "../pages/AcceptInvite";
import UserManagementPage from "../pages/UserManagementPage";

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
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
            path: "/to-review",
            element: <div>To-review</div>,
          },
          {
            path: "/course/invite",
            element: <AcceptInvite />,
          },
          {
            path: "/archived",
            element: <div>Archived class</div>,
          },
          {
            path: "/settings",
            element: <div>Settings</div>,
          },
          {
            path: "/class/:classCode",
            children: [
              {
                path: "stream",
                element: <ClassDetailsPage initTab={0} />,
              },
              {
                path: "classwork",
                element: <ClassDetailsPage initTab={1} />,
              },
              {
                path: "people",
                element: <ClassDetailsPage initTab={2} />,
              },
              {
                path: "grades",
                element: <ClassDetailsPage initTab={3} />,
              },
            ],
          },
        ],
      },
      {
        element: <RedirectRoute />,
        children: [
          {
            path: "/login",
            element: <LogInPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/landing",
            element: <LandingPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
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
            element: <UserManagementPage />,
          },
          {
            path: "settings",
            element: <div>Settings</div>,
          },
        ],
      },
    ],
  },
]);

export default router;

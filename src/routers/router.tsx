import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user/UserLayout";

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
]);

export default router;

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
    ],
  },
]);

export default router;

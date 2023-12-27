import { useEffect } from "react";
import { getUserList } from "../api/admin/apiAdmin";

export default function UserManagementPage() {
  useEffect(() => {
    getUserList({
      page: 1,
      size: 10,
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h1>User Management Page</h1>
    </div>
  );
}

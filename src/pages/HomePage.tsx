import { useNavigate } from "react-router-dom";
import { userApi } from "../api/axios";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </button>
  );
}

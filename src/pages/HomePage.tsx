import { userApi } from "../api/axios";

export default function HomePage() {
  return (
    <button
      onClick={async () => {
        const res = await userApi.login({
          userName: "dat@gmail.com",
          password: "1234567",
        });
        console.log(res);
      }}
    >
      Login
    </button>
  );
}

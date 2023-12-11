import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptInviteLink } from "../api/course/apiCourse";
import { useTranslation } from "react-i18next";

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("global");
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    acceptInviteLink(token!).then((res) => {
      navigate(`/class/${res.code}`);
    });
  }, [navigate, token]);
  return <>{!token && <div>{t("invalidInviteLink")}</div>}</>;
}

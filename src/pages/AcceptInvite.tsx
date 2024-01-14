import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { acceptInviteLink } from "../api/course/apiCourse";
import { useTranslation } from "react-i18next";
import toast from "../utils/toast";
import { IToastError } from "../types/common";

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
    acceptInviteLink(token!)
      .then((res) => {
        navigate(`/class/${res.courseCode}/stream`);
        toast.success(t("joinClassSuccessfully"), {
          preventDuplicate: true,
        });
      })
      .catch((err) => {
        if (err.courseCode) {
          navigate(`/class/${err.courseCode}/stream`);
          toast.error(err.message, {
            preventDuplicate: true,
          });
        } else {
          navigate("/");
          toast.error((err as IToastError).detail.message, {
            preventDuplicate: true,
          });
        }
      });
  }, [navigate, t, token]);
  return <>{!token && <div>{t("invalidInviteLink")}</div>}</>;
}

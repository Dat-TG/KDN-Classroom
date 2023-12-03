import { Grid } from "@mui/material";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ResetPasswordPage() {
  const { t } = useTranslation("global");
  useEffect(() => {
    document.title = t("resetPassword");
  }, [t]);
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={5} sx={{ pt: "100px" }}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ResetPasswordPage;

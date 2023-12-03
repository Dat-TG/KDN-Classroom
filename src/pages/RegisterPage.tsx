import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SocialLogin from "../components/SocialLogin";

function RegisterPage() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const { t } = useTranslation("global");

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", marginBottom: "48px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          style={{ padding: "32px", borderRadius: "7px", textAlign: "center" }}
        >
          {/* Register form */}
          <RegisterForm />
          <div
            className="or-divider"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "25px",
            }}
          >
            <span
              className="divider-line"
              style={{ flexGrow: 1, height: "1px", background: "#ccc" }}
            ></span>
            <span
              className="divider-text"
              style={{ margin: "0 16px", color: "#5b5c55", fontWeight: "600" }}
            >
              {t("orContinueWith")}
            </span>
            <span
              className="divider-line"
              style={{ flexGrow: 1, height: "1px", background: "#ccc" }}
            ></span>
          </div>

          <SocialLogin />
          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"16px"}
          >
            <Typography>{t("alreadyHaveAnAccount")}</Typography>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              {t("login")}
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;

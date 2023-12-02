import { Grid, Typography, Paper, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogInForm from "../components/LogInForm";
import facebookLogo from "../assets/images/logos/facebook.png";
import googleLogo from "../assets/images/logos/google.png";
import { useTranslation } from "react-i18next";

function LogInPage() {
  const { t } = useTranslation("global");
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          style={{ padding: "32px", borderRadius: "7px", textAlign: "center" }}
        >
          <LogInForm />
          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"right"}
            marginTop={"16px"}
          >
            <Link
              to={"/forgot-password"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              {t("forgotPassword")}
            </Link>
          </Stack>
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

          <div>
            <Button
              variant="outlined"
              sx={{ height: "50px", mr: 2, border: "transparent" }}
            >
              <img
                src={facebookLogo}
                style={{
                  objectFit: "scale-down",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Button>
            <Button
              variant="outlined"
              sx={{ height: "50px", border: "transparent" }}
            >
              <img
                src={googleLogo}
                style={{
                  objectFit: "scale-down",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Button>
          </div>

          <Stack
            spacing={0.5}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            justifyContent={"center"}
            marginTop={"16px"}
          >
            <Typography>{t("notAMemberYet")}</Typography>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#0074D9" }}
            >
              {t("register")}
            </Link>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LogInPage;
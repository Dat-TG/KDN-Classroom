import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import landingBackground from "../assets/images/background/landing-image.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import theme from "../themes/theme";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Classroom";
  }, []);

  const { t } = useTranslation("global");
  return (
    <>
      <Box
        sx={{
          pr: 10,
          pl: 10,
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          minHeight={"100vh"}
        >
          <Grid item xs={6}>
            <Typography
              component="h1"
              sx={{
                fontSize: 70,
                fontWeight: 700,
                lineHeight: 1.25,
                mb: 2,
              }}
            >
              {t("slogan")}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontSize: 20,
              }}
            >
              {t("sloganDetail")}
            </Typography>

            <Button
              sx={{ mt: 3 }}
              size="large"
              onClick={() => {
                navigate("/login");
              }}
              variant="outlined"
            >
              {t("getStarted")}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <img
                src={landingBackground}
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ background: theme.palette.secondary.light }}>
        <Grid
          item
          xs={12}
          sx={{
            pt: 10,
            pb: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={8} justifyContent={"center"} alignItems={"center"}>
            <Typography
              component="p"
              sx={{
                fontSize: 22,
                color: "#818281",
                textAlign: "center",
                textJustify: "inter-word",
              }}
            >
              {t("sloganDetail2")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;

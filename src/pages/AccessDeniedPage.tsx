import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AccessDeinedPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        minHeight={"100vh"}
      >
        <Typography variant="h3" gutterBottom>
          {t("accessDenied")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("youDoNotHavePermissionToAccessThisPage")}
        </Typography>
        <Box display={"flex"} gap={"24px"} mt={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("home")}
          </Button>
          {navigate.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (navigate.length > 0) {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
            >
              {t("back")}
            </Button>
          )}
        </Box>
      </Grid>
    </>
  );
}

import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import landingBackground from "../assets/images/background/landing-image.jpg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Classroom";
  }, []);
  return (
    <>
      <Box
        sx={{
          pr: 10,
          pl: 10,
          pt: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              component="h1"
              sx={{
                fontSize: 75,
                fontWeight: 700,
              }}
            >
              Where teaching and learning come together
            </Typography>

            <Typography
              component="p"
              sx={{
                fontSize: 20,
              }}
            >
              KDN Classroom helps educators create engaging learning experiences
              they can personalize, manage, and measure. It empowers educators
              to enhance their impact and prepare students for the future.
            </Typography>

            <Button
              sx={{ mt: 3 }}
              size="large"
              onClick={() => {
                navigate("/login");
              }}
              variant="outlined"
            >
              Get Started
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
      <Grid container sx={{ background: "#e4f2eb" }}>
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
          <Grid item xs={8} >
            <Typography
              component="p"
              sx={{
                fontSize: 22,
                color: "#818281",
                textAlign: "center",
                textJustify: "inter-word",
              }}
            >
              KDN Classroom is designed with feedback from the educational
              community, influencing the development of new features that let
              educators focus on teaching and students focus on learning.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;
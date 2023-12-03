import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";

export default function HomePage() {
  useEffect(() => {
    document.title = t("homePage");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation("global");

  return (
    <>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <Grid item key={index} sx={{ml: 2, mr: 2}}>

              <CourseCard />
            </Grid>
          ))}
        </Grid>
    </>
  );
}

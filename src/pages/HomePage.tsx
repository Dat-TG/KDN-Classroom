import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";
import { IGetCoursesRes } from "../types/course";

export default function HomePage() {
  useEffect(() => {
    document.title = t("homePage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation("global");

  const classList: IGetCoursesRes[] = [];

  return (
    <>
      <Grid container sx={{ margin: "30px", rowGap: 3 }}>
        {classList.map((value, index) => (
          <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
            <CourseCard classEntity={value} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

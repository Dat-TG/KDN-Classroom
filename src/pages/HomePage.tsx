/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";
import { ClassEntity } from "./ClassDetailsPage";
import { colorThemes } from "../utils/class_themes";

export default function HomePage() {
  useEffect(() => {
    document.title = t("homePage");
  }, []);

  const { t } = useTranslation("global");

  const classList: ClassEntity[] = [
    {
      id: "abcde",
      name: "2309-PTUDWNC-20_3",
      section: "Phát triển ứng dụng web nâng cao",
      subject: "Phát triển ứng dụng web nâng cao",
      room: "E402",
      backgroundImage: "https://www.gstatic.com/classroom/themes/img_volleyball.jpg",
      colorTheme: colorThemes[0].code,
      creater: {
        id: 1,
        name: "Teacher 1",
        email: "teacher@email.com",

      }
    }
  ]

  return (
    <>
      <Grid container sx={{ margin: "30px", rowGap: 3 }}>
        {classList.map((index) => (
          <Grid item key={index} sx={{ ml: 2, mr: 2 }}>

            <CourseCard classEntity={index} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

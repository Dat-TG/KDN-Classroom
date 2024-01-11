import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";
import { CourseContext } from "../context/CourseContext";

export default function HomePage() {
  const { courseData, loadingState } = useContext(CourseContext)!;

  useEffect(() => {
    document.title = t("homePage");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation("global");

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <>
        <Typography variant="h4">
          {loadingState.ownList ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            courseData.ownList.length > 0 && t("yourClass")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {loadingState.ownList
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              courseData.ownList.length > 0 &&
              courseData.ownList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
      </>
      <>
        <Typography variant="h4">
          {loadingState.teachList ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            courseData.teachList.length > 0 && t("yourJoinedClassAsTeacher")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {loadingState.teachList
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              courseData.teachList.length > 0 &&
              courseData.teachList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
        {courseData.teachList.length > 0 && (
          <div style={{ height: "30px" }}></div>
        )}
      </>
      <>
        <Typography variant="h4">
          {loadingState.classList ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            courseData.classList.length > 0 && t("yourJoinedClassAsStudent")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {loadingState.classList
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              courseData.classList.length > 0 &&
              courseData.classList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
      </>
    </div>
  );
}

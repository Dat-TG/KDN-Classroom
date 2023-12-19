import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Grid, Skeleton, Typography } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";
import { IGetCoursesRes, RoleCourseString } from "../types/course";
import { getCoursesByRole } from "../api/course/apiCourse";
import toast from "../utils/toast";
import { IToastError } from "../types/common";

export default function HomePage() {
  const [classList, setClassList] = useState<IGetCoursesRes[]>([]);
  const [teachList, setTeachList] = useState<IGetCoursesRes[]>([]);
  const [ownList, setOwnList] = useState<IGetCoursesRes[]>([]);
  const [isLoadingClass, setIsLoadingClass] = useState(true);
  const [isLoadingTeach, setIsLoadingTeach] = useState(true);
  const [isLoadingOwn, setIsLoadingOwn] = useState(true);

  useEffect(() => {
    document.title = t("homePage");
    getCoursesByRole(RoleCourseString.Student)
      .then((res) => {
        setClassList(res);
        setIsLoadingClass(false);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
    getCoursesByRole(RoleCourseString.Coteacher)
      .then((res) => {
        setTeachList(res);
        setIsLoadingTeach(false);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
    getCoursesByRole(RoleCourseString.Teacher)
      .then((res) => {
        setOwnList(res);
        setIsLoadingOwn(false);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
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
          {isLoadingOwn ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            ownList.length > 0 && t("yourClass")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {isLoadingOwn
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              ownList.length > 0 &&
              ownList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
        <div style={{ height: "30px" }}></div>
      </>
      <>
        <Typography variant="h4">
          {isLoadingTeach ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            teachList.length > 0 && t("yourJoinedClassAsTeacher")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {isLoadingTeach
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              teachList.length > 0 &&
              teachList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
        <div style={{ height: "30px" }}></div>
      </>
      <>
        <Typography variant="h4">
          {isLoadingClass ? (
            <Skeleton animation="wave" height={50} width="500px" />
          ) : (
            classList.length > 0 && t("yourJoinedClassAsStudent")
          )}
        </Typography>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {isLoadingClass
            ? // Skeleton placeholders for CourseCard while loading
              Array.from({ length: 3 }).map((_, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <Skeleton variant="rectangular" width={290} height={330} />
                </Grid>
              ))
            : // Render actual CourseCards when loaded
              classList.length > 0 &&
              classList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
        </Grid>
        <div style={{ height: "30px" }}></div>
      </>
    </div>
  );
}

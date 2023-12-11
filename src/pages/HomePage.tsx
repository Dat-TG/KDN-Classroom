import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
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
      {isLoadingOwn ? (
        <CircularProgress
          color="primary"
          size={30}
          sx={{ ml: "auto", mr: "auto", mt: "auto", mb: "auto" }}
        />
      ) : (
        ownList.length > 0 && (
          <>
            <Typography variant="h4">{t("yourClass")}</Typography>
            <Grid container sx={{ margin: "30px", rowGap: 3 }}>
              {ownList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                height: "30px",
              }}
            ></div>
          </>
        )
      )}
      {isLoadingTeach ? (
        <CircularProgress
          color="primary"
          size={30}
          sx={{ ml: "auto", mr: "auto", mt: "auto", mb: "auto" }}
        />
      ) : (
        teachList.length > 0 && (
          <>
            <Typography variant="h4">
              {t("yourJoinedClassAsTeacher")}
            </Typography>
            <Grid container sx={{ margin: "30px", rowGap: 3 }}>
              {teachList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                height: "30px",
              }}
            ></div>
          </>
        )
      )}{" "}
      {isLoadingClass ? (
        <CircularProgress
          color="primary"
          size={30}
          sx={{ ml: "auto", mr: "auto", mt: "auto", mb: "auto" }}
        />
      ) : (
        classList.length > 0 && (
          <>
            <Typography variant="h4">
              {t("yourJoinedClassAsStudent")}
            </Typography>
            <Grid container sx={{ margin: "30px", rowGap: 3 }}>
              {classList.map((value, index) => (
                <Grid item sx={{ ml: 2, mr: 2 }} key={index}>
                  <CourseCard classEntity={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
    </div>
  );
}

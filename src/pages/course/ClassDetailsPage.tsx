import {
  CircularProgress,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StreamPage from "./StreamPage";
import { Settings } from "@mui/icons-material";
import PeoplePage from "./PeoplePage";
import {
  baseUrlBackground,
  bgGeneral,
  colorThemes,
  extension,
} from "../../utils/class_themes";
import ClassSettingsDialog from "../../components/class_details/ClassSettingsDialog";
import { IGetCoursesRes, RoleCourseNumber } from "../../types/course";
import { getCourseByCode } from "../../api/course/apiCourse";
import { useNavigate, useParams } from "react-router-dom";
import toast from "../../utils/toast";
import { IToastError } from "../../types/common";
import GradesPage from "./GradesPage";

export default function ClassDetailsPage({ initTab }: { initTab: number }) {
  const [value, setValue] = React.useState(initTab);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t } = useTranslation("global");
  const { classCode } = useParams();
  const [classEntity, setClassEntity] = useState<IGetCoursesRes>(
    {} as IGetCoursesRes
  );
  const [bgImg, setBgImg] = useState<string>(
    `${baseUrlBackground}/${bgGeneral[0]}${extension}`
  );
  const [colorTheme, setColorTheme] = useState<string>(colorThemes[0].code);

  const [openClassSettingsDialog, setOpenClassSettingsDialog] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [teacherIds, setTeacherIds] = useState<number[]>([]);
  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [ownerId, setOwnerId] = useState<number>(0);

  const [classNotFound, setClassNotFound] = useState<boolean>(false);

  const [noPermission, setNoPermission] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getCourseByCode(classCode ?? "")
      .then((res: IGetCoursesRes) => {
        console.log("res: ", res);
        if (!res) {
          setNoPermission(true);
          return;
        }
        setClassEntity(res);
        setIsLoading(false);
        const tIds = res.course.userCourses
          .filter((value) => value.userRoleCourse == RoleCourseNumber.Coteacher)
          .map((item) => item.userId);
        const sIds = res.course.userCourses
          .filter((value) => value.userRoleCourse == RoleCourseNumber.Student)
          .map((item) => item.userId);
        const oId = res.course.userCourses.filter(
          (value) => value.userRoleCourse == RoleCourseNumber.Teacher
        )[0].userId;
        setOwnerId(oId);
        setTeacherIds(tIds);
        setStudentIds(sIds);
        setColorTheme(res.course.courseColor ?? colorThemes[0].code);
        setBgImg(
          res.course.courseBackground! ??
            `${baseUrlBackground}/${bgGeneral[0]}${extension}`
        );
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
        if ((err as IToastError).detail.message == "Course not existed") {
          setClassNotFound(true);
        }
      });
  }, [classCode]);

  return (
    <>
      {classNotFound ? (
        <Typography marginLeft={"30px"} marginTop={"30px"} variant="h6">
          {t("classNotFound")}
        </Typography>
      ) : noPermission ? (
        <Typography marginLeft={"30px"} marginTop={"30px"} variant="h6">
          {t("youAreNotMemberOfThisClass")}
        </Typography>
      ) : (
        <>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: colorTheme,
              },
            }}
            sx={{
              position: "relative",
              paddingX: 2,
            }}
          >
            <Tab
              value={0}
              label={t("stream")}
              style={{
                color: value === 0 ? colorTheme : "grey",
              }}
              LinkComponent={"a"}
              href={`/class/${classCode}/stream`}
              onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
              ) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (event.currentTarget.href.includes(`/class/${classCode}`)) {
                  event.preventDefault();
                  navigate(`/class/${classCode}/stream`);
                }
              }}
            />
            <Tab
              value={1}
              label={t("classwork")}
              style={{
                color: value === 1 ? colorTheme : "grey",
              }}
              LinkComponent={"a"}
              href={`/class/${classCode}/classwork`}
              onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
              ) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (event.currentTarget.href.includes(`/class/${classCode}`)) {
                  event.preventDefault();
                  navigate(`/class/${classCode}/classwork`);
                }
              }}
            />
            <Tab
              value={2}
              label={t("people")}
              style={{
                color: value === 2 ? colorTheme : "grey",
              }}
              LinkComponent={"a"}
              href={`/class/${classCode}/people`}
              onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
              ) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (event.currentTarget.href.includes(`/class/${classCode}`)) {
                  event.preventDefault();
                  navigate(`/class/${classCode}/people`);
                }
              }}
            />
            <Tab
              value={3}
              label={t("grades")}
              style={{
                color: value === 3 ? colorTheme : "grey",
              }}
              LinkComponent={"a"}
              href={`/class/${classCode}/grades`}
              onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
              ) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (event.currentTarget.href.includes(`/class/${classCode}`)) {
                  event.preventDefault();
                  navigate(`/class/${classCode}/grades`);
                }
              }}
            />
            <Tooltip title={t("classSettings")}>
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  margin: "auto",
                }}
                size="large"
                onClick={() => {
                  setOpenClassSettingsDialog(true);
                }}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </Tabs>
          <Divider />
          {isLoading ? (
            <CircularProgress
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-20px",
                marginLeft: "-20px",
              }}
            />
          ) : (
            <>
              <div hidden={value != 0}>
                <StreamPage
                  bgImg={bgImg}
                  classEntity={classEntity}
                  colorTheme={colorTheme}
                  setBgImg={setBgImg}
                  setColorTheme={setColorTheme}
                />
              </div>
              <div hidden={value != 2}>
                <PeoplePage
                  colorTheme={colorTheme}
                  classEntity={classEntity}
                  ownerId={ownerId}
                  teacherIds={teacherIds}
                  studentIds={studentIds}
                />
              </div>
              <div hidden={value != 3}>
                <GradesPage
                  colorTheme={colorTheme}
                  classEntity={classEntity}
                  ownerId={ownerId}
                  teacherIds={teacherIds}
                  studentIds={studentIds}
                />
              </div>
              <ClassSettingsDialog
                classId={classEntity.course.code}
                name={classEntity.course.nameCourse}
                section={classEntity.course.part}
                colorTheme={colorTheme}
                inviteLink="https://invitelink"
                open={openClassSettingsDialog}
                onClose={() => {
                  setOpenClassSettingsDialog(false);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

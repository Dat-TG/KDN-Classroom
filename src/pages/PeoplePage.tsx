import { PersonAddAlt1Outlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InviteTeacherDialog from "../components/class_details/InviteTeacherDialog";
import { useEffect, useState } from "react";
import InviteStudentDialog from "../components/class_details/InviteStudentDialog";
import { IGetCoursesRes, RoleCourseNumber } from "../types/course";
import { IUserProfileRes } from "../types/user";
import { getUserById } from "../api/user/apiUser";

interface Props {
  colorTheme: string;
  classEntity: IGetCoursesRes;
}

export default function PeoplePage(props: Props) {
  const { t } = useTranslation("global");
  const [openInviteTeacherDialog, setOpenInviteTeacherDialog] =
    useState<boolean>(false);
  const [openInviteStudentDialog, setOpenInviteStudentDialog] =
    useState<boolean>(false);
  const teacherIds = props.classEntity.course.userCourses
    .filter((value) => value.userRoleCourse == RoleCourseNumber.Coteacher)
    .map((item) => item.userId);
  const studentIds = props.classEntity.course.userCourses
    .filter((value) => value.userRoleCourse == RoleCourseNumber.Student)
    .map((item) => item.userId);
  const [teachers, setTeachers] = useState<IUserProfileRes[] | null>(null);
  const [students, setStudents] = useState<IUserProfileRes[] | null>(null);
  const [owner, setOwner] = useState<IUserProfileRes | null>(null);

  useEffect(() => {
    getUserById(props.classEntity.userId)
      .then((res) => {
        setOwner(res);
      })
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < teacherIds.length; i++) {
      getUserById(teacherIds[i])
        .then((res) => {
          setTeachers((prev) => {
            if (prev == null) return [res];
            return [...prev, res];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    for (let i = 0; i < studentIds.length; i++) {
      getUserById(studentIds[i])
        .then((res) => {
          setStudents((prev) => {
            if (prev == null) return [res];
            return [...prev, res];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.classEntity.userId, studentIds, teacherIds]);

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        paddingY={"24px"}
        paddingX={{
          xs: "32px",
          sm: "48px",
          md: "64px",
          lg: "96px",
          xl: "128px",
        }}
        justifyContent={"center"}
      >
        {/* Teachers */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"flex-end"}
        >
          <Typography
            sx={{
              color: props.colorTheme,
              fontSize: "36px",
            }}
          >
            {t("teachers")}
          </Typography>
          <IconButton
            size="large"
            onClick={() => {
              setOpenInviteTeacherDialog(true);
            }}
          >
            <PersonAddAlt1Outlined
              sx={{
                color: props.colorTheme,
                fontSize: "28px",
              }}
            />
          </IconButton>
        </Box>
        <Divider
          sx={{
            borderWidth: "1px",
            background: props.colorTheme,
            marginY: "16px",
          }}
        />
        <SinglePerson user={owner} />
        {teachers != null && teachers!.length > 0 && (
          <Divider
            sx={{
              marginY: "16px",
            }}
          ></Divider>
        )}
        {teachers != null && (
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            {teacherIds.map((item, index) => {
              return (
                <div>
                  <SinglePerson
                    key={`st ${item}`}
                    user={index < teachers!.length ? teachers![index] : null}
                  />
                  {index < teacherIds.length - 1 && (
                    <Divider
                      sx={{
                        marginTop: "16px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </Box>
        )}
        {/* Students */}
        <div style={{ height: "48px" }}></div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"flex-end"}
        >
          <Typography
            sx={{
              color: props.colorTheme,
              fontSize: "36px",
            }}
          >
            {t("students")}
          </Typography>
          <Box display={"flex"} gap={"16px"} alignItems={"center"}>
            <Typography
              sx={{
                color: props.colorTheme,
                fontSize: "16px",
              }}
            >{`${studentIds.length} ${t("studentss")}`}</Typography>
            <IconButton
              size="large"
              onClick={() => {
                setOpenInviteStudentDialog(true);
              }}
            >
              <PersonAddAlt1Outlined
                sx={{
                  color: props.colorTheme,
                  fontSize: "28px",
                }}
              />
            </IconButton>
          </Box>
        </Box>
        <Divider
          sx={{
            borderWidth: "1px",
            background: props.colorTheme,
            marginY: "16px",
          }}
        />
        {students != null && (
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            {studentIds.map((item, index) => {
              return (
                <div>
                  <SinglePerson
                    key={`st ${item}`}
                    user={index < students!.length ? students![index] : null}
                  />
                  {index < studentIds.length - 1 && (
                    <Divider
                      sx={{
                        marginTop: "16px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </Box>
        )}
      </Box>
      <InviteTeacherDialog
        open={openInviteTeacherDialog}
        onClose={() => setOpenInviteTeacherDialog(false)}
      />
      <InviteStudentDialog
        open={openInviteStudentDialog}
        onClose={() => setOpenInviteStudentDialog(false)}
      />
    </>
  );
}

function SinglePerson({ user }: { user: IUserProfileRes | null }) {
  return (
    <>
      <Box display={"flex"} gap={"16px"} alignItems={"center"} marginX={"24px"}>
        {user != null ? (
          <Avatar
            src={user?.avatar}
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
        {user != null ? (
          <Typography variant="body1">{`${user?.name} ${user.surname}`}</Typography>
        ) : (
          <Skeleton variant="text" width={100} height={20} />
        )}
      </Box>
    </>
  );
}

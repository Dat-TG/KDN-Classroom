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
import InviteTeacherDialog from "../../components/class_details/InviteTeacherDialog";
import { useEffect, useState } from "react";
import InviteStudentDialog from "../../components/class_details/InviteStudentDialog";
import { IGetCoursesRes } from "../../types/course";
import { IUserProfileRes } from "../../types/user";
import { getUserById } from "../../api/user/apiUser";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

interface Props {
  colorTheme: string;
  classEntity: IGetCoursesRes;
  teacherIds: number[];
  studentIds: number[];
  ownerId: number;
}

export default function PeoplePage(props: Props) {
  const { t } = useTranslation("global");
  const [openInviteTeacherDialog, setOpenInviteTeacherDialog] =
    useState<boolean>(false);
  const [openInviteStudentDialog, setOpenInviteStudentDialog] =
    useState<boolean>(false);
  const [teachers, setTeachers] = useState<IUserProfileRes[] | null>(null);
  const [students, setStudents] = useState<IUserProfileRes[] | null>(null);
  const [owner, setOwner] = useState<IUserProfileRes | null>(null);
  const user = useSelector(sGetUserInfo);

  useEffect(() => {
    getUserById(props.ownerId)
      .then((res) => {
        setOwner(res);
      })
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < props.teacherIds.length; i++) {
      getUserById(props.teacherIds[i])
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
    for (let i = 0; i < props.studentIds.length; i++) {
      getUserById(props.studentIds[i])
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
  }, [props.ownerId, props.studentIds, props.teacherIds]);

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
          {user?.id == owner?.id && (
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
          )}
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
            {props.teacherIds.map((item, index) => {
              return (
                <div>
                  <SinglePerson
                    key={`st ${item}`}
                    user={index < teachers!.length ? teachers![index] : null}
                  />
                  {index < props.teacherIds.length - 1 && (
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
            >{`${props.studentIds.length} ${t("studentss")}`}</Typography>
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
            {props.studentIds.map((item, index) => {
              return (
                <div>
                  <SinglePerson
                    key={`st ${item}`}
                    user={index < students!.length ? students![index] : null}
                  />
                  {index < props.studentIds.length - 1 && (
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
        courseCode={props.classEntity.course.code}
      />
      <InviteStudentDialog
        open={openInviteStudentDialog}
        onClose={() => setOpenInviteStudentDialog(false)}
        courseCode={props.classEntity.course.code}
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

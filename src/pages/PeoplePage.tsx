import { PersonAddAlt1Outlined } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import InviteTeacherDialog from "../components/class_details/InviteTeacherDialog";
import { useState } from "react";
import InviteStudentDialog from "../components/class_details/InviteStudentDialog";

interface Props {
  colorTheme: string;
}

export default function PeoplePage(props: Props) {
  const { t } = useTranslation("global");
  const [openInviteTeacherDialog, setOpenInviteTeacherDialog] =
    useState<boolean>(false);
  const [openInviteStudentDialog, setOpenInviteStudentDialog] =
    useState<boolean>(false);
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
        <SinglePerson />
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
            >{`11 ${t("studentss")}`}</Typography>
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
        <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <div>
                <SinglePerson key={`st ${item}`} />
                <Divider
                  sx={{
                    marginTop: "16px",
                  }}
                />
              </div>
            );
          })}

          <SinglePerson key={`st last`} />
        </Box>
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

function SinglePerson() {
  return (
    <>
      <Box display={"flex"} gap={"16px"} alignItems={"center"} marginX={"24px"}>
        <Avatar
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt12dbddde5342ce4c/648866ff21a8556da61fa167/GOAL_-_Blank_WEB_-_Facebook_-_2023-06-13T135350.847.png?auto=webp&format=pjpg&width=3840&quality=60"
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
        <Typography variant="body1">Lionel Messi</Typography>
      </Box>
    </>
  );
}

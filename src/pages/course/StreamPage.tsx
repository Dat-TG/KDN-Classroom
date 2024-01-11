import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CancelPresentation,
  ContentCopy,
  Edit,
  Fullscreen,
  Info,
  InfoOutlined,
  LinkOutlined,
  MoreVert,
  RotateLeft,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import ChangeClassThemeDialog from "../../components/class_details/ChangeClassThemeDialog";
import ClassCodeDialog from "../../components/class_details/ClassCodeDialog";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import { IGetCoursesRes } from "../../types/course";
import {
  updateCourseBackground,
  updateCourseColor,
} from "../../api/course/apiCourse";
import toast from "../../utils/toast";

interface Props {
  classEntity: IGetCoursesRes;
  bgImg: string;
  setBgImg: React.Dispatch<React.SetStateAction<string>>;
  colorTheme: string;
  setColorTheme: React.Dispatch<React.SetStateAction<string>>;
  inviteLink: string;
}

export default function StreamPage({
  classEntity,
  bgImg,
  colorTheme,
  setBgImg,
  setColorTheme,
  inviteLink,
}: Props) {
  const { t } = useTranslation("global");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [openCustomizeDialog, setOpenCustomizeDialog] =
    useState<boolean>(false);
  const [openClassCodeDialog, setOpenClassCodeDialog] =
    useState<boolean>(false);
  const user = useSelector(sGetUserInfo);
  useEffect(() => {
    document.title = `${classEntity.course.nameCourse} - ${classEntity.course.topic}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        sx={{
          boxShadow: showInfo ? "0px 0px 6px 0px rgba(0, 0, 0, 0.3)" : "none",
          marginX: "64px",
          marginTop: "24px",
          borderRadius: "16px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            padding: "24px",
            position: "relative",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            borderBottomLeftRadius: showInfo ? "0px" : "16px",
            borderBottomRightRadius: showInfo ? "0px" : "16px",
          }}
          height={"100%"}
        >
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: colorTheme,
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onClick={() => {
                setOpenCustomizeDialog(true);
              }}
            >
              <Edit fontSize="medium" sx={{ marginRight: "8px" }} />
              <Typography
                style={{
                  fontSize: "16px",
                }}
              >
                {t("customize")}
              </Typography>
            </Button>
          </Box>
          <Box height={"100px"}></Box>
          <Typography variant="h5" color={"white"}>
            {classEntity.course.nameCourse}
          </Typography>
          <Typography variant="h6" color={"white"}>
            {classEntity.course.part}
          </Typography>

          <IconButton
            sx={{
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
            autoFocus
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? (
              <Info
                sx={{
                  color: "white",
                  fontSize: "28px",
                }}
              />
            ) : (
              <InfoOutlined
                sx={{
                  color: "white",
                  fontSize: "28px",
                }}
              />
            )}
          </IconButton>
        </Box>
        {showInfo && (
          <Box
            sx={{
              backgroundColor: "white",
              padding: "24px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={"4px"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Typography fontSize={"16px"} fontWeight={"500"}>
                {t("classCode")}
              </Typography>
              <Typography fontWeight={"300"} marginLeft={"8px"}>
                {classEntity.course.code}
              </Typography>
              <Tooltip title={t("display")}>
                <IconButton
                  onClick={() => {
                    setOpenClassCodeDialog(true);
                  }}
                >
                  <Fullscreen />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display={"flex"} gap={"8px"}>
              <Typography fontSize={"16px"} fontWeight={"500"}>
                {t("subject")}
              </Typography>
              <Typography fontWeight={"300"}>
                {classEntity.course.topic}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"8px"}>
              <Typography fontSize={"16px"} fontWeight={"500"}>
                {t("room")}
              </Typography>
              <Typography fontWeight={"300"}>
                {classEntity.course.room}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        marginY={"24px"}
        marginX={"64px"}
        display={"flex"}
        flexDirection={"row"}
        gap={"24px"}
      >
        <Box
          sx={{
            padding: "16px",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
          }}
          display={"flex"}
          flexDirection={"column"}
          gap={"8px"}
          position={"relative"}
          maxWidth={"200px"}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <MenuClassCode
              courseCode={classEntity.course.code}
              inviteLink={inviteLink}
            />
          </div>
          <Typography fontWeight={"600"} fontSize={"16px"}>
            {t("classCode")}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography fontWeight={"500"} fontSize={"24px"} color={colorTheme}>
              {classEntity.course.code}
            </Typography>
            <Tooltip title={t("display")}>
              <IconButton
                onClick={() => {
                  setOpenClassCodeDialog(true);
                }}
              >
                <Fullscreen
                  sx={{
                    color: colorTheme,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"24px"}
          flexGrow={1}
        >
          <Box
            sx={{
              padding: "16px",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.3)",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              "&:hover": {
                "& .announceText": {
                  color: colorTheme,
                },
              },
            }}
            display={"flex"}
            alignItems={"center"}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                width: "48px",
                height: "48px",
              }}
            ></Avatar>
            <Typography
              className="announceText"
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: "grey",
                marginLeft: "16px",
              }}
            >
              {t("announceSomthingToYourClass")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ChangeClassThemeDialog
        open={openCustomizeDialog}
        onClose={() => {
          setOpenCustomizeDialog(false);
        }}
        classId={classEntity.course.code}
        colorTheme={colorTheme}
        backgroundImage={bgImg}
        handleBackgroundImageChange={async (image) => {
          setBgImg(image);
          updateCourseBackground(classEntity.courseId, image)
            .then(() => {
              toast.success(t("updateCourseBackgroundSuccessfully"));
            })
            .catch((err) => {
              toast.error(err.detail.message);
            });
        }}
        handleColorThemeChange={(color) => {
          setColorTheme(color);
          updateCourseColor(classEntity.courseId, color)
            .then(() => {
              toast.success(t("updateCourseColorSuccessfully"));
            })
            .catch((err) => {
              toast.error(err.detail.message);
            });
        }}
      />
      <ClassCodeDialog
        classId={classEntity.course.code}
        name={classEntity.course.nameCourse!}
        section={classEntity.course.part!}
        colorTheme={colorTheme}
        open={openClassCodeDialog}
        onClose={() => {
          setOpenClassCodeDialog(false);
        }}
        inviteLink={inviteLink}
      />
    </Box>
  );
}

interface MenuClassCodeProps {
  courseCode: string;
  inviteLink: string;
}

function MenuClassCode({ courseCode, inviteLink }: MenuClassCodeProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation("global");
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(inviteLink);
            toast.simple(t("copiedToClipboard"));
            handleClose();
          }}
        >
          <LinkOutlined />
          <Typography marginLeft={"8px"}>{t("copyClassInviteLink")}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(courseCode);
            toast.simple(t("copiedToClipboard"));
            handleClose();
          }}
        >
          <ContentCopy />
          <Typography marginLeft={"8px"}>{t("copyClassCode")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RotateLeft />
          <Typography marginLeft={"8px"}>{t("resetClassCode")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <CancelPresentation />
          <Typography marginLeft={"8px"}>{t("turnOff")}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

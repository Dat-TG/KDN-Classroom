import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  baseUrlBackground,
  bgGeneral,
  colorThemes,
  extension,
} from "../utils/class_themes";
import { useState } from "react";
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
import { useParams } from "react-router-dom";
import ChangeClassThemeDialog from "../components/ChangeClassThemeDialog";
import ClassCodeDialog from "../components/ClassCodeDialog";

export default function StreamPage() {
  const { classId } = useParams();
  const classEntity = {
    id: classId,
    name: "2309-PTUDWNC-20_3",
    section: "Phát triển ứng dụng web nâng cao",
    subject: "Phát triển ứng dụng web nâng cao",
    room: "E402",
    backgroundImage: `${baseUrlBackground}/${bgGeneral[1]}${extension}`,
    colorTheme: colorThemes[0].code,
    creater: {
      id: 1,
      name: "Teacher 1",
      email: "teacher@email.com",
    },
  };
  const [bgImg, setBgImg] = useState<string>(`${classEntity.backgroundImage}`);
  const [colorTheme, setColorTheme] = useState<string>(classEntity.colorTheme);
  const { t } = useTranslation("global");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [openCustomizeDialog, setOpenCustomizeDialog] =
    useState<boolean>(false);
  const [openClassCodeDialog, setOpenClassCodeDialog] =
    useState<boolean>(false);
  return (
    <>
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
            {classEntity.name}
          </Typography>
          <Typography variant="h6" color={"white"}>
            {classEntity.section}
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
                {classEntity.id}
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
              <Typography fontWeight={"300"}>{classEntity.subject}</Typography>
            </Box>
            <Box display={"flex"} gap={"8px"}>
              <Typography fontSize={"16px"} fontWeight={"500"}>
                {t("room")}
              </Typography>
              <Typography fontWeight={"300"}>{classEntity.room}</Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Grid container spacing={2} marginY={"24px"} marginX={"64px"}>
        <Grid container xs={2} spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "16px",
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
              }}
              display={"flex"}
              flexDirection={"column"}
              gap={"8px"}
              position={"relative"}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                }}
              >
                <MenuClassCode />
              </div>
              <Typography fontWeight={"600"} fontSize={"16px"}>
                {t("classCode")}
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <Typography
                  fontWeight={"500"}
                  fontSize={"24px"}
                  color={colorTheme}
                >
                  {classEntity.id}
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
          </Grid>
        </Grid>
      </Grid>
      <ChangeClassThemeDialog
        open={openCustomizeDialog}
        onClose={() => {
          setOpenCustomizeDialog(false);
        }}
        classId={classEntity.id!}
        handleBackgroundImageChange={(image) => {
          setBgImg(image);
        }}
        handleColorThemeChange={(color) => {
          setColorTheme(color);
        }}
      />
      <ClassCodeDialog
        classId={classEntity.id!}
        name={classEntity.name!}
        section={classEntity.section!}
        colorTheme={colorTheme}
        inviteLink="https://invitelink"
        open={openClassCodeDialog}
        onClose={() => {
          setOpenClassCodeDialog(false);
        }}
      />
    </>
  );
}

function MenuClassCode() {
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
        <MenuItem onClick={handleClose}>
          <LinkOutlined />
          <Typography marginLeft={"8px"}>{t("copyClassInviteLink")}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
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

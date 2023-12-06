import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  baseUrlBackground,
  bgGeneral,
  colorThemes,
  extension,
} from "../utils/class_themes";
import { useState } from "react";
import { Check, PhotoOutlined } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string;
  handleBackgroundImageChange: (image: string) => void;
  handleColorThemeChange: (color: string) => void;
}
export default function ChangeClassThemeDialog(props: Props) {
  const { t } = useTranslation("global");
  const classEntity = {
    id: props.classId,
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
  const [bgImg, setBgImg] = useState<string>(
    `url("${classEntity.backgroundImage}")`
  );
  const [colorTheme, setColorTheme] = useState<string>(classEntity.colorTheme);
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.onClose();
        setColorTheme(classEntity.colorTheme);
      }}
      maxWidth={"md"}
    >
      <DialogTitle>{t("customizeAppearance")}</DialogTitle>
      <DialogContent>
        <Box
          width={"100%"}
          height={"150px"}
          borderRadius={"8px"}
          sx={{
            marginBottom: "16px",
            backgroundImage: bgImg,
            backgroundSize: "cover",
          }}
        ></Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>{t("selectStreamHeaderImage")}</Typography>
          <Button
            sx={{
              marginBottom: "16px",
              background: alpha(colorTheme, 0.1),
              color: colorTheme,
              borderRadius: "8px",
              ":focus": {
                background: alpha(colorTheme, 0.2),
              },
              ":hover": {
                background: alpha(colorTheme, 0.2),
              },
            }}
          >
            <PhotoOutlined />
            <Typography marginLeft={"8px"}>{t("selectPhoto")}</Typography>
          </Button>
        </Box>
        <Typography marginBottom={"16px"}>{t("selectThemeColor")}</Typography>
        <Box display={"flex"} justifyContent={"space-between"} gap={"16px"}>
          {colorThemes.map((color) => (
            <Tooltip key={color.code} title={color.name}>
              <IconButton
                size="large"
                sx={{
                  background: alpha(color.code, 0.9),
                  borderRadius: "100%",
                  ":focus": {
                    background: alpha(color.code, 1),
                  },
                  ":hover": {
                    background: alpha(color.code, 1),
                  },
                }}
                onClick={() => {
                  setColorTheme(color.code);
                }}
              >
                {color.code === colorTheme ? (
                  <Check
                    fontSize="large"
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  <Check
                    fontSize="large"
                    sx={{
                      color: "transparent",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
            setColorTheme(classEntity.colorTheme);
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            props.handleBackgroundImageChange(bgImg);
            props.handleColorThemeChange(colorTheme);
            props.onClose();
          }}
          disabled={colorTheme == classEntity.colorTheme}
          sx={{
            color: colorTheme,
          }}
        >
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

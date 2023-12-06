import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import {
  baseUrlBackground,
  bgGeneral,
  colorThemes,
  extension,
} from "../utils/class_themes";
import { useState } from "react";
import { Edit, Fullscreen, Info, InfoOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function StreamPage() {
  const [bgImg, setBgImg] = useState<string>(
    `url("${baseUrlBackground}/${bgGeneral[0]}${extension}")`
  );
  const [colorTheme, setColorTheme] = useState<string>(colorThemes[0]);
  const { t } = useTranslation("global");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { classId } = useParams();
  const classEntity = {
    id: classId,
    name: "2309-PTUDWNC-20_3",
    section: "Phát triển ứng dụng web nâng cao",
    subject: "Phát triển ứng dụng web nâng cao",
    room: "E402",
    creater: {
      id: 1,
      name: "Teacher 1",
      email: "teacher@email.com",
    },
  };
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
            backgroundImage: bgImg,
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
              <Typography fontWeight={"300"} marginLeft={"8px"}>{classEntity.id}</Typography>
              <Tooltip title={t("display")}>
                <IconButton>
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
    </>
  );
}

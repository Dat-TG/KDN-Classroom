import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  baseUrlBackground,
  bgGeneral,
  colorThemes,
  extension,
} from "../utils/class_themes";
import { useState } from "react";
import { Edit, Info, InfoOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function StreamPage() {
  const [bgImg, setBgImg] = useState<string>(
    `url("${baseUrlBackground}/${bgGeneral[0]}${extension}")`
  );
  const [colorTheme, setColorTheme] = useState<string>(colorThemes[0]);
  const { t } = useTranslation("global");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  return (
    <>
      <Box
        sx={{
          marginX: "64px",
          marginY: "24px",
          backgroundImage: bgImg,
          padding: "24px",
          position: "relative",
        }}
        borderRadius={"16px"}
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
          2309-PTUDWNC-20_3
        </Typography>
        <Typography variant="h6" color={"white"}>
          Phát triển ứng dụng web nâng cao
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
    </>
  );
}

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  baseUrlBackground,
  bgArts,
  bgEnglishHistory,
  bgGeneral,
  bgMathScience,
  bgOthers,
  bgSports,
  colorThemes,
  extension,
} from "../../utils/class_themes";
import { useState } from "react";
import { Check, PhotoOutlined } from "@mui/icons-material";
import ListBackgroundImage from "./ListBackgroundImage";

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string;
  colorTheme?: string;
  backgroundImage?: string;
  handleBackgroundImageChange: (image: string) => void;
  handleColorThemeChange: (color: string) => void;
}
export default function ChangeClassThemeDialog(props: Props) {
  const { t } = useTranslation("global");

  const [bgImg, setBgImg] = useState<string>(
    props.backgroundImage ?? `${baseUrlBackground}/${bgGeneral[0]}${extension}`
  );
  const [colorTheme, setColorTheme] = useState<string>(
    props.colorTheme ?? colorThemes[0].code
  );
  const [openBackgroundImageDialog, setOpenBackgroundImageDialog] =
    useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tempBgImg, setTempBgImg] = useState<string>("");
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.onClose();
        setColorTheme(props.colorTheme ?? colorThemes[0].code);
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
            backgroundImage: `url("${bgImg}")`,
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
            onClick={() => {
              setOpenBackgroundImageDialog(true);
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
          disabled={
            colorTheme == props.colorTheme && bgImg == props.backgroundImage
          }
          sx={{
            color: colorTheme,
          }}
        >
          {t("save")}
        </Button>
      </DialogActions>
      <Dialog
        open={openBackgroundImageDialog}
        onClose={() => {
          setOpenBackgroundImageDialog(false);
          setBgImg(
            props.backgroundImage ??
              `${baseUrlBackground}/${bgGeneral[0]}${extension}`
          );
        }}
        maxWidth={"md"}
        sx={{
          minHeight: "80vh",
          maxHeight: "80vh",
        }}
      >
        <DialogTitle>
          {t("selectClassTheme")}
          <Tabs
            value={tabIndex}
            onChange={(_event: React.SyntheticEvent, newValue: number) => {
              setTabIndex(newValue);
              setTempBgImg("");
            }}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value={0} label={t("general")} />
            <Tab value={1} label={t("englishHistory")} />
            <Tab value={2} label={t("mathScience")} />
            <Tab value={3} label={t("arts")} />
            <Tab value={4} label={t("sports")} />
            <Tab value={5} label={t("other")} />
          </Tabs>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              height: "16px",
            }}
          ></div>
          <ListBackgroundImage
            currentImage={tempBgImg !== "" ? tempBgImg : bgImg}
            callback={(image: string) => {
              setTempBgImg(image);
            }}
            list={
              tabIndex === 0
                ? bgGeneral.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
                : tabIndex === 1
                ? bgEnglishHistory.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
                : tabIndex === 2
                ? bgMathScience.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
                : tabIndex === 3
                ? bgArts.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
                : tabIndex === 4
                ? bgSports.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
                : bgOthers.map(
                    (image) => `${baseUrlBackground}/${image}${extension}`
                  )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenBackgroundImageDialog(false);
              setBgImg(
                props.backgroundImage ??
                  `${baseUrlBackground}/${bgGeneral[0]}${extension}`
              );
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              setOpenBackgroundImageDialog(false);
              if (tempBgImg !== "") {
                setBgImg(tempBgImg);
              }
            }}
            sx={{
              color: colorTheme,
            }}
          >
            {t("selectClassTheme")}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}

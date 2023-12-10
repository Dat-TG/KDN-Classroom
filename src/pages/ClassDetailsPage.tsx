import {
  CircularProgress,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
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
} from "../utils/class_themes";
import ClassSettingsDialog from "../components/class_details/ClassSettingsDialog";
import { IGetCoursesRes } from "../types/course";
import { getCourseByCode } from "../api/course/apiCourse";
import { useParams } from "react-router-dom";
import toast from "../utils/toast";
import { IToastError } from "../types/common";

export default function ClassDetailsPage() {
  const [value, setValue] = React.useState(0);

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

  useEffect(() => {
    getCourseByCode(classCode ?? "")
      .then((res) => {
        setClassEntity(res);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
  }, [classCode]);

  return (
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
        />
        <Tab
          value={1}
          label={t("classwork")}
          style={{
            color: value === 1 ? colorTheme : "grey",
          }}
        />
        <Tab
          value={2}
          label={t("people")}
          style={{
            color: value === 2 ? colorTheme : "grey",
          }}
        />
        <Tab
          value={3}
          label={t("grades")}
          style={{
            color: value === 3 ? colorTheme : "grey",
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
            <PeoplePage colorTheme={colorTheme} />
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
  );
}

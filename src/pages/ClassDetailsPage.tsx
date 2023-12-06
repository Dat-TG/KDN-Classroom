import { Divider, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
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
import { useParams } from "react-router-dom";

export interface ClassEntity {
  id: string;
  name: string;
  section: string;
  subject: string;
  room: string;
  backgroundImage: string;
  colorTheme: string;
  creater: {
    id: number;
    name: string;
    email: string;
  };
}

export default function ClassDetailsPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t } = useTranslation("global");
  const { classId } = useParams();
  const classEntity: ClassEntity = {
    id: classId!,
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
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
          size="large"
        >
          <Settings />
        </IconButton>
      </Tabs>
      <Divider />
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
    </>
  );
}

import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import StreamPage from "./StreamPage";

export default function ClassDetailsPage() {
  //const { classId } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t } = useTranslation("global");

  const classEntity = {
    id: 1,
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
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={0} label={t("stream")} />
        <Tab value={1} label={t("classwork")} />
        <Tab value={2} label={t("people")} />
        <Tab value={3} label={t("grades")} />
      </Tabs>
      <Divider />
      <div hidden={value != 0}>
        <StreamPage />
      </div>
    </>
  );
}

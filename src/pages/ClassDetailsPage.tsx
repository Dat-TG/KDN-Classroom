import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import StreamPage from "./StreamPage";

export default function ClassDetailsPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { t } = useTranslation("global");
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

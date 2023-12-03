import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation("global");
  document.title = t("homePage");
  return <>Home</>;
}

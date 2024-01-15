import i18next from "i18next";
import global_en from "./en/global.json";
import global_vi from "./vi/global.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: localStorage.getItem("language") ?? "en", // language to use
  resources: {
    en: {
      global: global_en,
    },
    vi: {
      global: global_vi,
    },
  },
});

export default i18next;

import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import enImg from "../../assets/images/lang/en.png";
import viImg from "../../assets/images/lang/vi.png";

const LanguageMenu: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const languages = [
    {
      name: t("english"),
      code: "en",
    },
    {
      name: t("vietnamese"),
      code: "vi",
    },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Default language

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    handleClose();
    // Implement language change logic here
  };

  return (
    <div>
      <IconButton
        sx={{
          borderRadius: "50%",
          width: "30px",
          height: "30px", // Set button size
          padding: 0, // Remove padding to fit the image properly
          overflow: "hidden", //  Hide overflow if the image exceeds the button size
          backgroundColor: "grey.300",
          ":hover": {
            backgroundColor: "grey.500",
          },
        }}
        onClick={handleClick}
      >
        <img
          src={selectedLanguage === "en" ? enImg : viImg}
          style={{
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        ></img>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
          >
            {lang.name}
          </MenuItem>
        ))}
        {/* Add more MenuItem components for other languages */}
      </Menu>
    </div>
  );
};

export default LanguageMenu;

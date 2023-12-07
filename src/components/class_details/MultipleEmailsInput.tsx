import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { emailPattern } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { Avatar, ListItemText, MenuItem, MenuList } from "@mui/material";

interface Props {
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleEmailsInput: React.FC<Props> = ({ emails, setEmails }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [openSuggestion, setOpenSuggestion] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (validateEmail(inputValue)) {
      setOpenSuggestion(true);
    } else {
      if (openSuggestion) {
        setOpenSuggestion(false);
      }
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      addEmail();
      setOpenSuggestion(false);
    }
  };

  const addEmail = () => {
    if (emails.includes(inputValue.trim())) {
      setInputValue("");
      return;
    }
    if (validateEmail(inputValue)) {
      setEmails([...emails, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDelete = (emailToDelete: string) => () => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email !== emailToDelete)
    );
  };

  const validateEmail = (email: string): boolean => {
    // Your email validation logic here
    const re = emailPattern;
    return re.test(email);
  };

  const { t } = useTranslation("global");

  return (
    <div>
      <TextField
        variant="standard"
        placeholder={t("multipleEmailsGuide")}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
        fullWidth
      ></TextField>
      <div
        style={{
          minHeight: "48px",
        }}
      >
        {openSuggestion && (
          <MenuList id="composition-menu" aria-labelledby="composition-button">
            <MenuItem
              onClick={() => {
                addEmail();
                setOpenSuggestion(false);
              }}
              autoFocus
              sx={{
                paddingX: "16px",
                paddingY: "16px",
              }}
            >
              <Avatar
                sx={{
                  width: "32px",
                  height: "32px",
                  marginRight: "8px",
                  fontSize: "12px",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                }}
              />
              <ListItemText> {inputValue}</ListItemText>
            </MenuItem>
          </MenuList>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
        {emails.map((email, index) => (
          <Chip
            key={index}
            label={email}
            size="medium"
            variant="outlined"
            onDelete={handleDelete(email)}
            style={{ marginRight: "5px", marginBottom: "5px" }}
            avatar={<Avatar></Avatar>}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleEmailsInput;

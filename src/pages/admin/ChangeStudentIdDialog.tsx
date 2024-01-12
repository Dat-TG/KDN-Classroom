import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

interface ChangeStudentIdDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStudentId: string) => void;
}

const ChangeStudentIdDialog: React.FC<ChangeStudentIdDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [newStudentId, setNewStudentId] = useState<string>("");

  const { t } = useTranslation("global");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudentId(event.target.value);
  };

  const handleSave = () => {
    // Add your logic to handle the new student ID
    console.log("New Student ID:", newStudentId);

    // Call the onConfirm callback
    onConfirm(newStudentId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("changeStudentId")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="newStudentId"
          label="New Student ID"
          type="text"
          fullWidth
          value={newStudentId}
          onChange={handleInputChange}
          helperText={t("changeStudentIdHelper")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("cancel")}
        </Button>
        <Button onClick={handleSave} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeStudentIdDialog;

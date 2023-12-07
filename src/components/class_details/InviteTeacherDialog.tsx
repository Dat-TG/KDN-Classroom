import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MultipleEmailsInput from "./MultipleEmailsInput";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InviteTeacherDialog({ onClose, open }: Props) {
  const { t } = useTranslation("global");
  const [emails, setEmails] = useState<string[]>([]);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          onClose();
        }}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>{t("inviteTeachers")}</DialogTitle>
        <DialogContent>
          <MultipleEmailsInput emails={emails} setEmails={setEmails} />
          <Divider
            sx={{
              marginY: "16px",
            }}
          />
          <Typography variant="subtitle1">{t("inviteTeacherNote")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            disabled={emails.length === 0}
          >
            {t("invite")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

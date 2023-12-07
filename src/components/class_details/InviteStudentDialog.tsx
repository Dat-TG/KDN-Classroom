import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MultipleEmailsInput from "./MultipleEmailsInput";
import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import toast from "../../utils/toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function InviteStudentDialog({ onClose, open }: Props) {
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
        <DialogTitle>{t("inviteStudents")}</DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            {t("inviteLink")}
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textOverflow: "ellipsis",
                maxLines: 1,
              }}
              noWrap
            >
              https://classroom.google.com/c/NjQ0MzcyMzUwNDA5?cjc=gimhunnNjQ0MzcyMzUwNDA5?cjc=gimhunn
            </Typography>

            <Tooltip title={t("copyClassInviteLink")}>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://classroom.google.com/c/NjQ0MzcyMzUwNDA5?cjc=gimhunnNjQ0MzcyMzUwNDA5?cjc=gimhunn"
                  );
                  toast.simple(t("copiedToClipboard"));
                }}
                color="primary"
                size="large"
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider
            sx={{
              marginTop: "8px",
              marginBottom: "16px",
            }}
          />
          <MultipleEmailsInput emails={emails} setEmails={setEmails} />
          <Divider
            sx={{
              marginY: "16px",
            }}
          />
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

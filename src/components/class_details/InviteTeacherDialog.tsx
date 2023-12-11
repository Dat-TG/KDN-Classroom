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
import { RoleCourseString } from "../../types/course";
import { sendInviteLink } from "../../api/course/apiCourse";
import toast from "../../utils/toast";
import { useState } from "react";

interface Props {
  courseCode: string;
  open: boolean;
  onClose: () => void;
}

export default function InviteTeacherDialog({
  onClose,
  open,
  courseCode,
}: Props) {
  const { t } = useTranslation("global");
  const [emails, setEmails] = useState<string[]>([]);

  const handleSendEmail = async () => {
    for (let i = 0; i < emails.length; i++) {
      try {
        await sendInviteLink({
          courseCode: courseCode,
          emailAddress: emails[i],
          roleCourse: RoleCourseString.Coteacher,
        });
        toast.success(t("sendInviteLinkSuccessfullyTo") + emails[i]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.detail.message);
      }
    }
    onClose();
  };
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
              handleSendEmail();
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

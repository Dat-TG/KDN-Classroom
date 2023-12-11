import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MultipleEmailsInput from "./MultipleEmailsInput";
import { useEffect, useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import toast from "../../utils/toast";
import { createInviteLink, sendInviteLink } from "../../api/course/apiCourse";
import { RoleCourseString } from "../../types/course";

interface Props {
  courseCode: string;
  open: boolean;
  onClose: () => void;
}

export default function InviteStudentDialog({
  onClose,
  open,
  courseCode,
}: Props) {
  const { t } = useTranslation("global");
  const [emails, setEmails] = useState<string[]>([]);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  useEffect(() => {
    createInviteLink({
      courseCode: courseCode,
      roleCourse: RoleCourseString.Student,
    })
      .then((res) => {
        setInviteLink(res.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [courseCode]);

  const handleSendEmail = async () => {
    for (let i = 0; i < emails.length; i++) {
      try {
        await sendInviteLink({
          courseCode: courseCode,
          emailAddress: emails[i],
          roleCourse: RoleCourseString.Student,
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
            {inviteLink != null ? (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textOverflow: "ellipsis",
                    maxLines: 1,
                  }}
                  noWrap
                >
                  {inviteLink}
                </Typography>

                <Tooltip title={t("copyClassInviteLink")}>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink);
                      toast.simple(t("copiedToClipboard"));
                    }}
                    color="primary"
                    size="large"
                  >
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Skeleton variant="text" width={"300px"} />
            )}
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
            onClick={async () => {
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

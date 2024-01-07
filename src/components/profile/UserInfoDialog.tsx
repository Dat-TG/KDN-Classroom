import { Dialog, DialogContent, Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IUserInfoDialogProps {
  user: {
    name: string;
    avatar: string;
    email: string;
    studentId: string;
  };
  open: boolean;
  handleClose: () => void;
}

const UserInfoDialog = ({ user, open, handleClose }: IUserInfoDialogProps) => {
  const { name, avatar, email, studentId } = user;
  const { t } = useTranslation("global");
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: "80px",
            height: "80px",
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>
          {t("studentId")}: {studentId}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;

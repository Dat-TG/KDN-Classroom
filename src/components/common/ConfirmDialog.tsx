import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

interface IConfirmationDialogProps {
  open: boolean;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  content,
}: IConfirmationDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const { t } = useTranslation("global");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("confirmation")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("cancel")}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

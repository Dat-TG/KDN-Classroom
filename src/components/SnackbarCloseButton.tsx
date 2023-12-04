import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { SnackbarKey, useSnackbar } from "notistack";

function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <Close sx={{ color: "white" }} />
    </IconButton>
  );
}

export default SnackbarCloseButton;

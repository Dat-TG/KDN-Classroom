import {
  closeSnackbar,
  enqueueSnackbar,
  OptionsObject,
  SnackbarKey,
} from "notistack";
export default {
  success(msg: string, options?: OptionsObject): void {
    enqueueSnackbar(msg, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      ...options,
    });
  },
  warning(msg: string, options?: OptionsObject): void {
    enqueueSnackbar(msg, {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      ...options,
    });
  },
  info(msg: string, options?: OptionsObject): void {
    enqueueSnackbar(msg, {
      variant: "info",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      ...options,
    });
  },
  error(msg: string, options?: OptionsObject): void {
    enqueueSnackbar(msg, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      ...options,
    });
  },
  simple(msg: string, options?: OptionsObject): void {
    enqueueSnackbar(msg, {
      variant: "default",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      ...options,
    });
  },
  close(key: SnackbarKey): void {
    closeSnackbar(key);
  },
  closeAll(): void {
    closeSnackbar();
  },
};

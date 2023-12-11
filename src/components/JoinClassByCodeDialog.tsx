import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joinCourse } from "../api/course/apiCourse";
import toast from "../utils/toast";
import { IToastError } from "../types/common";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Inputs {
  code: string;
}
export default function JoinClassByCodeDialog(props: Props) {
  const { t } = useTranslation("global");

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(true);
    try {
      await joinCourse(data.code.trim());
      toast.success(t("joinClassSuccessfully"));
    } catch (error) {
      toast.error((error as IToastError).detail.message);
    }
    props.onClose();
    setIsLoading(false);
  };
  return (
    <>
      <Dialog
        open={props.open}
        fullScreen
        maxWidth={"md"}
        onClose={() => {
          props.onClose();
        }}
      >
        <DialogTitle display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
            <Tooltip title={t("close")} sx={{ mr: 1 }}>
              <IconButton
                onClick={() => {
                  props.onClose();
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
            <Box display={"flex"} alignItems={"center"}>
              <Typography> {t("joinClass")}</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!!errors.code}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
            ) : (
              t("join")
            )}
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 3,
              // boxShadow: 24,
              border: "solid 1px",
              borderColor: "darkGray",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ mb: 1 }}
            >
              {t("classCode")}
            </Typography>
            <Typography variant="subtitle1">{t("joinClassGuide")}</Typography>
            <Controller
              name="code"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  style={{ marginTop: "16px" }}
                  {...field}
                  label={t("classCode")}
                  fullWidth
                  type="text"
                  variant="outlined"
                  error={!!errors.code}
                  helperText={errors.code ? t("requiredField") : ""}
                />
              )}
            />
          </Box>

          {/* <Button variant="contained" onClick={showEntity}>
                        show
                    </Button> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

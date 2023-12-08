import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Inputs = {
  name: string;
  section: string;
  subject: string;
  room: string;
};

const CreateClassModal = forwardRef((_props, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useImperativeHandle(ref, () => ({
    open(): void {
      handleOpen();
    },
  }));

  const [isLoading /*setIsLoading*/] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // setIsLoading(true);
    // await dispatch(
    //   loginUser({
    //     userName: data.email,
    //     password: data.password,
    //   })
    // );
    // await dispatch(getUserProfile());
    // setIsLoading(false);
    console.log(data);
  };

  const [t] = useTranslation("global");
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("createClass")}
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ mt: 1 }}
                label={t("className") + " *"}
                variant="filled"
                error={!!errors.name}
              />
            )}
          />
          <Controller
            name="section"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ mt: 1 }}
                label={t("section")}
                variant="filled"
                error={!!errors.section}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ mt: 1 }}
                label={t("subject")}
                variant="filled"
                error={!!errors.subject}
              />
            )}
          />
          <Controller
            name="room"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ mt: 1 }}
                label={t("room")}
                variant="filled"
                error={!!errors.room}
              />
            )}
          />

          <Box sx={{ display: "flex", mt: 2 }}>
            <Button
              variant="text"
              size="large"
              sx={{ ml: "auto", mr: 1.5, color: "grey" }}
              onClick={handleClose}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                }}
              >
                {" "}
                {t("cancel")}
              </Typography>
            </Button>
            <Button
              type="submit"
              variant="text"
              color="primary"
              size="large"
              disabled={isLoading || !!errors.name}
            >
              {isLoading ? (
                <CircularProgress size={30} style={{ color: "white" }} />
              ) : (
                <Typography
                  sx={{
                    fontWeight: "500",
                  }}
                >
                  {t("create")}
                </Typography>
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
});

export default CreateClassModal;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { logoutUser, updatePasswordUser } from "../store/user/thunkApi";
// import { useUser } from "../hooks/useUser";
// import { AuthContext } from "../context/AuthContext";

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  // const { user } = useContext(AuthContext);

  // const { login } = useUser();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const res = await dispatch(
      updatePasswordUser({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
    );
    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(logoutUser({}));
    }
    setIsLoading(false);
  };

  const { t } = useTranslation("global");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Box width="50%">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t("changePassword")}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", display: "block", mt: 2 }}
            >
              {t("currentPassword")}
            </Typography>
            <Controller
              name="currentPassword"
              control={control}
              rules={{
                required: "Old Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  hiddenLabel
                  fullWidth
                  variant="outlined"
                  error={!!errors.currentPassword}
                  helperText={
                    errors.currentPassword
                      ? errors.currentPassword.type == "required"
                        ? t("requiredField")
                        : t("passwordValidate")
                      : ""
                  }
                  type={showOldPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          style={{ display: field.value ? "flex" : "none" }}
                          edge="end"
                        >
                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", display: "block", mt: 2 }}
            >
              {t("newPassword")}
            </Typography>

            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  hiddenLabel
                  fullWidth
                  variant="outlined"
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword
                      ? errors.newPassword.type == "required"
                        ? t("requiredField")
                        : t("passwordValidate")
                      : ""
                  }
                  type={showNewPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{ display: field.value ? "flex" : "none" }}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", display: "block", mt: 2 }}
            >
              {t("confirmPassword")}
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm New Password is required",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  hiddenLabel
                  fullWidth
                  variant="outlined"
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type == "required"
                        ? t("requiredField")
                        : errors.confirmPassword.type == "minLength"
                        ? t("passwordValidate")
                        : t("passwordNotMatch")
                      : ""
                  }
                  type={showConfirmNewPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setShowConfirmNewPassword(!showConfirmNewPassword)
                          }
                          style={{ display: field.value ? "flex" : "none" }}
                          edge="end"
                        >
                          {showConfirmNewPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
        sx={{
          textTransform: "none",
          mt: 3,
        }}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>{t("confirm")}</Typography>
        )}
      </Button>
    </form>
  );
}

export default ChangePasswordForm;

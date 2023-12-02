import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {  useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { registerUser } from "../store/user/thunkApi";
// import { AuthContext } from "../context/AuthContext";
// import { useUser } from "../hooks/useUser";

type Inputs = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  // const { user } = useContext(AuthContext);
  // const { register } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Handle register logic here
    setIsLoading(true);

    await dispatch(registerUser( {
      emailAddress: data.email,
      password: data.password,
      firstName: data.firstname,
      surname: data.lastname,
    }));

    setIsLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassord] = useState(false);

  // if (user != null) {
  //   return <Navigate to="/" replace />;
  // }

  const { t } = useTranslation("global");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"}>
        {t("register")}
      </Typography>
      {/* Email input */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: emailPattern,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "48px" }}
            {...field}
            label="Email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={
              errors.email ? "Please enter a valid email address." : ""
            }
          />
        )}
      />

      {/* First Name input */}
      <Controller
        name="firstname"
        control={control}
        rules={{
          required: true,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label={t("firstName")}
            fullWidth
            variant="outlined"
            error={!!errors.firstname}
            placeholder=""
            helperText={errors.firstname ? "Please enter your first name." : ""}
          />
        )}
      />

      {/* Last Name input */}
      <Controller
        name="lastname"
        control={control}
        rules={{
          required: true,
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label={t("lastName")}
            fullWidth
            variant="outlined"
            error={!!errors.lastname}
            placeholder=""
            helperText={errors.lastname ? "Please enter your last name." : ""}
          />
        )}
      />

      {/* Password input */}
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 6 }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label={t("password")}
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={
              errors.password
                ? "Password is required and should be at least 6 characters."
                : ""
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {/* Confirm password input */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: true,
          validate: (value) => value === getValues("password"),
        }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label={t("confirmPassword")}
            fullWidth
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? "Passwords do not match." : ""}
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowConfirmPassord(!showConfirmPassword)}
                    style={{ display: field.value ? "flex" : "none" }}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "32px" }}
        size="large"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"}>{t("registerUppercase")}</Typography>
        )}
      </Button>
    </form>
  );
}

export default RegisterForm;

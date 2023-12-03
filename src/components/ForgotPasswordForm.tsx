import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
};

function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    console.log(data);
  };

  const { t } = useTranslation("global");

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h1"
        align="center"
        fontWeight={"bold"}
        sx={{ color: "#0a2838" }}
      >
        {t("forgotPassword")}
      </Typography>
      <Typography variant="body1" align="left" sx={{ color: "gray", mt: 3 }}>
        {t("resetPasswordGuide")}
      </Typography>

      <Typography
        variant="body1"
        align="left"
        fontWeight={"bold"}
        sx={{ color: "primary", mt: 3 }}
      >
        Email
      </Typography>
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
            sx={{ mt: 1 }}
            {...field}
            hiddenLabel
            fullWidth
            type="email"
            variant="filled"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={
              errors.email ? t("emailValidationMessage") : ""
            }
            InputProps={{
              sx: { backgroundColor: "white" },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "32px", borderRadius: "10px", padding: "10px", textTransform: 'none' }}
        size="large"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={30} style={{ color: "white" }} />
        ) : (
          <Typography fontSize={"16px"} variant="body1">
            {t("sendLink")}
          </Typography>
        )}
      </Button>

      <Button
        variant="contained"
        style={{
          marginLeft: "16px",
          marginTop: "32px",
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: "#D3D3D3",
        }}
        size="large"
        onClick={() => navigate(-1)}
      >
        <Typography fontSize={"16px"} variant="body1" color={"black"}>
          {t("backToLogin")}
        </Typography>
      </Button>
    </form>
  );
}

export default ForgotPasswordForm;

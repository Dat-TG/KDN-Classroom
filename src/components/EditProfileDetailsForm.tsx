import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sGetUserInfo } from "../store/user/selector";
import { AppDispatch } from "../store";
import { updateInformationUser } from "../store/user/thunkApi";

type Inputs = {
  firstName: string;
  lastName: string;
};

function EditProfileDetailsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await dispatch(
      updateInformationUser({
        name: data.firstName,
        surname: data.lastName,
      })
    );
    setIsLoading(false);
    console.log(data);
  };

  const { t } = useTranslation("global");
  const user = useSelector(sGetUserInfo);
  return user == null ? (
    <div>Loading...</div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("details")}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", width: "50%" }}>
            <Box sx={{ mr: 3, flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", display: "block" }}
              >
                {t("firstName")}
              </Typography>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: true,
                  maxLength: 50,
                }}
                defaultValue={user.name}
                render={({ field }) => (
                  <TextField
                    {...field}
                    hiddenLabel
                    fullWidth
                    variant="outlined"
                    error={!!errors.firstName}
                    placeholder="binding user.firstName"
                    helperText={
                      errors.firstName ? "Please enter your first name." : ""
                    }
                    //biding ..
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", display: "block" }}
              >
                {t("lastName")}
              </Typography>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true, maxLength: 50 }}
                defaultValue={user.surname}
                render={({ field }) => (
                  <TextField
                    {...field}
                    hiddenLabel
                    fullWidth
                    variant="outlined"
                    error={!!errors.lastName}
                    placeholder="binding user.lastName"
                    helperText={
                      errors.lastName ? "Please enter your last name." : ""
                    }
                  />
                )}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
              {t("email")}
            </Typography>
            <Typography variant="body1" sx={{ color: "black", pl: 1 }}>
              {user.emailAddress}
            </Typography>
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
          <Typography fontSize={"16px"}>{t("save")}</Typography>
        )}
      </Button>
    </form>
  );
}

export default EditProfileDetailsForm;

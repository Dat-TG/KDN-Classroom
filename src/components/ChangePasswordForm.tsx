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
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useUser } from "../hooks/useUser";
// import { AuthContext } from "../context/AuthContext";

type Inputs = {
    currentPassword: string;
    newPassword: string;
};

function ChangePasswordForm() {
    const [isLoading, setIsLoading] = useState(false);

    // const { user } = useContext(AuthContext);

    // const { login } = useUser();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
    };

    const { t } = useTranslation("global");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                            rules={{ required: true, minLength: 6 }}
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

                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", display: "block", mt: 1 }}
                        >
                            {t("newPassword")}
                        </Typography>

                        <Controller
                            name="newPassword"
                            control={control}
                            rules={{ required: true, minLength: 6 }}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    hiddenLabel
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.newPassword}
                                    helperText={
                                        errors.currentPassword
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
                    mt: 3
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

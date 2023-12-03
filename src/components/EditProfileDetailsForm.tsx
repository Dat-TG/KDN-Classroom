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
    firstName: string;
    lastName: string;
};

function EditProfileDetailsForm() {
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

    return (
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
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        hiddenLabel
                                        fullWidth
                                        
                                        variant="outlined"
                                        error={!!errors.firstName}
                                        placeholder="binding user.firstName"
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
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        hiddenLabel
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.lastName}
                                        placeholder="binding user.lastName"
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
                            {t("email")}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "black", pl: 1}}>
                            binding user.email
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
                    mt: 3
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

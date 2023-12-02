import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { Navigate } from "react-router-dom";
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


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{fontWeight: "bold"}}>Details</Typography>
            <Box sx={{ mt: 2, display: "flex" }}>
                <Box sx={{mr: 3}}>
                    <Typography variant="body1" sx={{ fontWeight: "bold", display: "block" }}>First Name</Typography>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 50
                        }}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                               
                                {...field}
                                hiddenLabel
                                fullWidth
                                type="email"
                                variant="outlined"
                                error={!!errors.firstName}
                                //biding ..
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold", display: "block" }}>Last Name</Typography>
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
                                
                            />
                        )}
                    />
                </Box>
            </Box>


            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                sx={{
                    mt: 2,
                    textTransform: 'none'
                }}
            >
                {isLoading ? (
                    <CircularProgress size={30} style={{ color: "white" }} />
                ) : (
                    <Typography fontSize={"16px"}>Save</Typography>
                )}
            </Button>
        </form>
    );
}

export default EditProfileDetailsForm;

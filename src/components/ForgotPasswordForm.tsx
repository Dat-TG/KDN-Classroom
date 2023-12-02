
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "../utils/helpers";
import { useState } from "react";


type Inputs = {
    email: string;
};


function ForgotForm() {
    const [isLoading, setIsLoading] = useState(false);

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
            <Typography variant="h1" align="center" fontWeight={"bold"} sx={{ color: "#0a2838" }}>
                Reset your password
            </Typography>
            <Typography variant="body1" align="left" sx={{ color: "gray", mt: 3 }}>
            Enter the email you signed up with. We'll send you a link to log in and reset your password.
            </Typography>
            
            <Typography variant="body1" align="left" fontWeight={"bold"} sx={{ color: "primary", mt : 3 }}>
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
                        sx={{ mt : 1}}
                        {...field}
                        hiddenLabel
                        fullWidth
                        type="email"
                        variant="filled"
                        error={!!errors.email}
                        placeholder="email@example.com"
                        helperText={
                            errors.email ? "Please enter a valid email address." : ""
                        }
                        InputProps={{
                            sx: { backgroundColor: 'white',}
                          }}
                    />
                )}
            />


            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "32px", borderRadius : "10px", padding: "15px" }}
                size="large"
                disabled={isLoading}
                
            >
                {isLoading ? (
                    <CircularProgress size={30} style={{ color: "white" }} />
                ) : (
                    <Typography fontSize={"16px"} variant="body1">Send link</Typography>
                )}
            </Button>
        </form>
    );
}

export default ForgotForm;


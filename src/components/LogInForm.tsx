import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
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
  email: string;
  password: string;
};

function LogInForm() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Log In";
  }, []);

  // const { user } = useContext(AuthContext);

  // const { login } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    // Handle login logic here
    // await login({
    //   emailAddress: data.email,
    //   password: data.password,
    //   callback: ()=>setIsLoading(false),
    // });
    
  };

  const [showPassword, setShowPassword] = useState(false);

  // if (user != null) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" align="center" fontWeight={"bold"} sx={{color: "#5b5c55"}}>
        Log In With
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
            style={{ marginTop: "48px" }}
            {...field}
            label="Email"
            fullWidth
            type="email"
            variant="outlined"
            error={!!errors.email}
            placeholder="email@example.com"
            helperText={
              errors.email ? "Please enter a valid email address." : ""
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 6 }}
        defaultValue=""
        render={({ field }) => (
          <TextField
            style={{ marginTop: "32px" }}
            {...field}
            label="Password"
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
          <Typography fontSize={"16px"}>Login</Typography>
        )}
      </Button>
    </form>
  );
}

export default LogInForm;

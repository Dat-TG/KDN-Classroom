import { Grid } from "@mui/material";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5} sx={{pt : "100px"}} >

          <ForgotPasswordForm />


        </Grid>
      </Grid>
    </div>

  );
}

export default ForgotPasswordPage;

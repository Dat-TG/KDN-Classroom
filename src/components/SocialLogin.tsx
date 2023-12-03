import { Box, Button } from "@mui/material";
import facebookLogo from "../assets/images/logos/facebook.png";
import { GoogleLogin } from "@react-oauth/google";

export default function SocialLogin() {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          variant="outlined"
          sx={{ height: "50px", mr: 2, border: "transparent" }}
        >
          <img
            src={facebookLogo}
            style={{
              objectFit: "scale-down",
              width: "100%",
              height: "100%",
            }}
          ></img>
        </Button>

        <GoogleLogin
          width={"400"}
          logo_alignment="center"
          onSuccess={(credential) => {
            console.log(credential);
          }}
          onError={() => {
            console.log("error");
          }}
          type="icon"
          shape="circle"
          theme="outline"
        />
      </Box>
    </>
  );
}

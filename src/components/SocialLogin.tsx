import { Box } from "@mui/material";
import facebookLogo from "../assets/images/logos/facebook.png";
import { useGoogleLogin } from "@react-oauth/google";
import googleLogo from "../assets/images/logos/google.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getUserProfile, loginUserWithGoogle } from "../store/user/thunkApi";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function SocialLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(
        loginUserWithGoogle({
          googleAuthToken: `${tokenResponse["token_type"]} ${tokenResponse["access_token"]}`,
        })
      );
      await dispatch(getUserProfile());
    },
    onError: (error) => {
      console.error(`${error}`);
    },
  });

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {/* <img
          src={facebookLogo}
          style={{
            objectFit: "scale-down",
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            cursor: "pointer",
            marginRight: "32px",
          }}
        ></img> */}

        <FacebookLogin
          appId={import.meta.env.VITE_REACT_APP_FACEBOOK_APP_ID}
          onSuccess={(response) => {
            console.log("Login Success!", response.accessToken);
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!", response);
          }}
          render={({ onClick }) => (
            <img
              src={facebookLogo}
              style={{
                objectFit: "scale-down",
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                cursor: "pointer",
                marginRight: "32px",
              }}
              onClick={onClick}
            ></img>
          )}
        />

        <img
          src={googleLogo}
          style={{
            objectFit: "scale-down",
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            cursor: "pointer",
          }}
          onClick={() => handleGoogleLogin()}
        ></img>
      </Box>
    </>
  );
}

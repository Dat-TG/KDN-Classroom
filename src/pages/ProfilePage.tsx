import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AvatarEditorComponent from "../components/AvatarEditor";
import EditProfileDetailsForm from "../components/EditProfileDetailsForm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../store/user/selector";
import ChangePasswordForm from "../components/ChangePasswordForm";

// import { AuthContext } from "../context/AuthContext";
// import { useUser } from "../hooks/useUser";

function ProfilePage() {
  useEffect(() => {
    document.title = "My profile";
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation("global");

  const user = useSelector(sGetUserInfo);

  return (
    <Grid container sx={{ padding: 10 }}>
      <Grid item sx={{}} xs={12}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
          {t("account")}
        </Typography>
        <Typography variant="body1" sx={{ color: "darkgray" }} gutterBottom>
          {t("manageYourProfile")}
        </Typography>
        <Divider
          sx={{
            mt: 2,
            backgroundColor: "gray",
            borderBottomWidth: 2,
            borderRadius: "1.5px",
          }}
        ></Divider>
      </Grid>

      <Grid item xs={12} sx={{ mt: 5 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={`${user?.name} ${user?.surname}`}
            src={user?.avatar}
            sx={{
              width: {
                md: 150,
                sm: 100,
                xs: 70,
              },
              height: {
                md: 150,
                sm: 100,
                xs: 70,
              },
              mr: 5,
            }}
          />
          <AvatarEditorComponent callback={setIsLoading} />
        </div>
      </Grid>

      <Grid item xs={12} sx={{ mt: 5, display: "block" }}>
        <EditProfileDetailsForm />
      </Grid>

      <Grid item xs={12} sx={{ mt: 5, display: "block" }}>
        <ChangePasswordForm />
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}

export default ProfilePage;

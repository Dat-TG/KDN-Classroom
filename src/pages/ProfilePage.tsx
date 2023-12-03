import { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Grid,
    Typography,
    Divider,
} from "@mui/material";
import AvatarEditorComponent from "../components/AvatarEditor";
import { Controller } from "react-hook-form";
import EditProfileDetailsForm from "../components/EditProfileDetailsForm";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "../components/ChangePasswordForm";



// import { AuthContext } from "../context/AuthContext";
// import { useUser } from "../hooks/useUser";

function ProfilePage() {
    useEffect(() => {
        document.title = "My profile";
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    //const { user } = useContext(AuthContext);

    //const { editInformation, changePassword } = useUser();

    //   const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
    //   const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    //     useState(false);

    const buttonStyle = {
        marginTop: "8px",
        color: "#0074D9",
        borderColor: "#0074D9",
    };

    const {t}=useTranslation("global");

    return (
        <Grid
            container
           sx={{padding: 10}}
        >
            <Grid item sx={{}} xs={12}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom >
                    {t("account")}
                </Typography>
                <Typography variant="body1" sx={{  color: "darkgray" }} gutterBottom >
                    {t("manageYourProfile")}
                </Typography>
                <Divider sx={{ mt: 2, backgroundColor: "gray", borderBottomWidth: 2, borderRadius: "1.5px"}} ></Divider>
            </Grid>

            <Grid item xs={12} sx={{ mt: 5 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        // alt={`${user?.firstname} ${user?.lastname}`}
                        src={""}
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
                            mr: 5
                        }}
                    />
                    <AvatarEditorComponent callback={setIsLoading} />
                </div>
            </Grid>

            <Grid item xs={12} sx={{ mt: 5, display: "block" }}>
               
                <EditProfileDetailsForm/>
            </Grid>

            <Grid item xs={12} sx={{ mt: 5, display: "block" }}>
               <ChangePasswordForm/>
                
            </Grid>


        </Grid>
    );
}

export default ProfilePage;
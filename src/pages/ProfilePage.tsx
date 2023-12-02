import { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    Typography,
    Paper,
    CircularProgress,
    Backdrop,
    Divider,
    Box,
    TextField,
} from "@mui/material";
import AvatarEditorComponent from "../components/AvatarEditor";
import { Controller } from "react-hook-form";
import EditProfileDetailsForm from "../components/EditProfileDetailsForm";


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

    return (
        <Grid
            container
            style={{ margin: "100px" }}
        >
            <Grid item sx={{}} xs={12}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom >
                    Account
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "darkgray" }} gutterBottom >
                    Manage your profile
                </Typography>
                <Divider sx={{ mt: 2, fontWeight: "bold" }} ></Divider>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
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

            <Grid item xs={12} sx={{ mt: 3, display: "block" }}>
               
                <EditProfileDetailsForm/>
            </Grid>
        </Grid>
    );
}

export default ProfilePage;
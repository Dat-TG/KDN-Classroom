import {
    Close,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ClassInfoForm from "./ClassInfoForm";
import { useRef } from "react";
import { ClassEntity } from "../../pages/ClassDetailsPage";
import { colorThemes } from "../../utils/class_themes";
import ClassScoreForm from "./ClassScoreForm";

interface Props {
    open: boolean;
    onClose: () => void;
    classId: string;
    inviteLink: string;
    colorTheme: string;
    name: string;
    section: string;
}
export default function ClassSettingsDialog(props: Props) {

    const infoFormSubmitRef = useRef<HTMLButtonElement>(null);

    const classEntity: ClassEntity = {
        id: "abc",
        name: "2309-PTUDWNC-20_3",
        section: "Phát triển ứng dụng web nâng cao",
        subject: "Phát triển ứng dụng web nâng cao",
        room: "E402",
        backgroundImage: "",
        colorTheme: colorThemes[0].code,
        creater: {
            id: 1,
            name: "Teacher 1",
            email: "teacher@email.com",
        },
    };

    const Save = () => {

        infoFormSubmitRef?.current?.click();
        console.log(classEntity);

    }

    const { t } = useTranslation("global");
    return (
        <>
            <Dialog
                open={props.open}
                fullScreen
                maxWidth={"md"}
                onClose={() => {
                    props.onClose();
                }}
            >
                <DialogTitle
                    display={"flex"}
                    justifyContent={"space-between"}

                >
                    <Box display={"flex"} >
                        <Tooltip title={t("close")} sx={{ mr: 1 }}>
                            <IconButton
                                onClick={() => {
                                    props.onClose();
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Tooltip>
                        <Box display={"flex"} alignItems={"center"}>
                            <Typography> {t("classSettings")}</Typography>
                        </Box>

                    </Box>

                    <Button variant="contained" onClick={Save}>
                        {t("save")}
                    </Button>

                </DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 600,
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            // boxShadow: 24,
                            border: "solid 1px",
                            borderColor: "darkGray",
                            p: 4,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 1 }}>
                            {t("createClass")}
                        </Typography>
                        <ClassInfoForm submitRef={infoFormSubmitRef} classEntity={classEntity} />
                    </Box>

                    <Box
                        sx={{
                            width: 600,
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            border: "solid 1px",
                            borderColor: "darkGray",
                            p: 4,
                            mt: 2,
                        }}
                    >
                    
                        <ClassScoreForm submitRef={infoFormSubmitRef} classEntity={classEntity} />
                    </Box>

                    {/* <Button variant="contained" onClick={showEntity}>
                        show
                    </Button> */}

                </DialogContent>
            </Dialog>
        </>
    );
}

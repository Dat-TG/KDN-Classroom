import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ClassEntity } from "../../pages/ClassDetailsPage";

interface Props {
    classEntity?: ClassEntity | undefined;
    hiddenSubmit?: boolean;
    submitRef?: any;
}

const ClassInfoForm: React.FC<Props> = (props) => {

    const classEntity = props.classEntity;

    const newClassEntity: ClassEntity = {
        id: "",
        name: "",
        section: "",
        subject: "",
        room: "",
        backgroundImage: "",
        colorTheme: "",
        creater: {
            id: 1,
            name: "name",
            email: "email",
        }
    }

    const entity = classEntity || newClassEntity;

    const [isLoading /*setIsLoading*/] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassEntity>({ defaultValues: entity });

    const onSubmit: SubmitHandler<ClassEntity> = async (data) => {

        // test
        if (classEntity != undefined){
            classEntity.name = data.name;
            classEntity.section = data.section;
            classEntity.subject = data.subject;
            classEntity.room = data.room;
        }
        console.log(data);
    };

    const [t] = useTranslation("global");

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
           
            <Controller
                name="name"
                control={control}
                rules={{
                    required: true,
                }}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ mt: 1 }}
                        label={t("className") + " *"}
                        variant="filled"
                        error={!!errors.name}
                    />
                )}
            />
            <Controller
                name="section"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ mt: 1 }}
                        label={t("section")}
                        variant="filled"
                        error={!!errors.section}
                    />
                )}
            />
            <Controller
                name="subject"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ mt: 1 }}
                        label={t("subject")}
                        variant="filled"
                        error={!!errors.subject}
                    />
                )}
            />
            <Controller
                name="room"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{ mt: 1 }}
                        label={t("room")}
                        variant="filled"
                        error={!!errors.room}
                    />
                )}
            />


            <Box sx={{ display: (props.hiddenSubmit == true) ? "flex" : "none", mt: 2 }}>
                <Button
                    ref={props.submitRef}
                    type="submit"
                    variant="text"
                    color="primary"
                    size="large"
                    disabled={isLoading || !!errors.name}
                >
                    {isLoading ? (
                        <CircularProgress size={30} style={{ color: "white" }} />
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: "500",
                            }}
                        >
                            {t("create")}
                        </Typography>
                    )}
                </Button>
            </Box>

        </form>

    );
}

export default ClassInfoForm;

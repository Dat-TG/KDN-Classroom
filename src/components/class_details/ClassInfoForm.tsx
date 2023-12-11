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
import { ICourse, ICreateCoursesReq } from "../../types/course";
import { createCourse } from "../../api/course/apiCourse";
import toast from "../../utils/toast";
import { IToastError } from "../../types/common";
import { useNavigate } from "react-router-dom";

interface Props {
  classEntity?: ICourse | undefined;
  hiddenSubmit?: boolean;
  submitRef?:
    | React.RefObject<HTMLButtonElement>
    | React.MutableRefObject<HTMLButtonElement>;
  onDialogClose?: () => void;
}

const ClassInfoForm: React.FC<Props> = (props) => {
  const classEntity = props.classEntity;

  const { t } = useTranslation("global");

  const newClassEntity: ICreateCoursesReq = {
    id: 0,
    nameCourse: "",
    part: "",
    room: "",
    topic: "",
    description: "",
  };

  const entity = classEntity || newClassEntity;

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCoursesReq>({
    defaultValues: {
      nameCourse: entity.nameCourse,
      part: entity.part,
      room: entity.room,
      topic: entity.topic,
      description: entity.description,
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ICreateCoursesReq> = async (data) => {
    console.log(data);
    setIsLoading(true);
    createCourse(data)
      .then((res) => {
        toast.success(t("createClassSuccessfully"));
        setIsLoading(false);
        props.onDialogClose!();
        navigate(`/class/${res.code}`);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
        setIsLoading(false);
        props.onDialogClose!();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nameCourse"
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
            error={!!errors.nameCourse}
            helperText={errors.nameCourse && t("requiredField")}
          />
        )}
      />
      <Controller
        name="part"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ mt: 1 }}
            label={t("section")}
            variant="filled"
            error={!!errors.part}
          />
        )}
      />
      <Controller
        name="topic"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            sx={{ mt: 1 }}
            label={t("subject")}
            variant="filled"
            error={!!errors.topic}
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

      <Box
        sx={{ display: props.hiddenSubmit == true ? "none" : "flex", mt: 2 }}
      >
        <Button
          variant="text"
          size="large"
          sx={{ ml: "auto", mr: 1.5, color: "grey" }}
          onClick={props.onDialogClose}
        >
          <Typography
            sx={{
              fontWeight: "500",
            }}
          >
            {t("cancel")}
          </Typography>
        </Button>

        <Button
          ref={props.submitRef}
          type="submit"
          variant="text"
          color="primary"
          size="large"
          disabled={isLoading || !!errors.nameCourse}
        >
          {isLoading ? (
            <CircularProgress size={25} style={{ color: "primary" }} />
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
};

export default ClassInfoForm;

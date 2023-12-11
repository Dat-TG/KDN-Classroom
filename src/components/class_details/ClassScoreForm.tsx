import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ICourse } from "../../types/course";

interface Props {
  classEntity: ICourse;
  submitRef?:
    | React.RefObject<HTMLButtonElement>
    | React.MutableRefObject<HTMLButtonElement>;
}

const ClassScoreForm: React.FC<Props> = (props) => {
  const classEntity = props.classEntity;

  const [isLoading /*setIsLoading*/] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourse>({ defaultValues: classEntity });

  const onSubmit: SubmitHandler<ICourse> = async (data) => {
    console.log(data);
  };

  const [gradeCalculation, setGradeCalculation] = useState("");
  const handleGradeCalculationChange = (event: SelectChangeEvent) => {
    setGradeCalculation(event.target.value);
  };

  const [showGrade, setShowGrade] = useState(false);

  const handleShowGradeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowGrade(event.target.checked);
  };

  const [t] = useTranslation("global");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography
        id="modal-modal-title"
        variant="h4"
        component="h2"
        sx={{ mb: 2 }}
      >
        {t("grading")}
      </Typography>

      <Typography variant="h5" sx={{ mb: 1, fontWeight: 400 }}>
        {t("gradeCalculation")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {t("overallGradeCalculation")}
        </Typography>
        <Controller
          name="room" // test
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl size="small">
              <Select
                {...field}
                value={gradeCalculation}
                onChange={handleGradeCalculationChange}
                sx={{ minWidth: 150, width: 150 }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxWidth: 150,
                    },
                  },
                }}
              >
                <MenuItem value={1} sx={{ textOverflow: "ellipsis" }}>{t("noOverallGrade")}</MenuItem>
                <MenuItem value={2} >
                  {t("totalPoints")}
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {t("showOverallGrade")}
        </Typography>
        <Controller
          name="room" // test
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Switch
              {...field}
              checked={showGrade}
              onChange={handleShowGradeChange}
            />
          )}
        />
      </Box>

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

      <Divider sx={{ mt: 3, mr: 1, ml: 1 }}></Divider>

      <Typography variant="h5" sx={{ mt: 2, fontWeight: 400 }}>
        {t("gradeCategories")}
      </Typography>

      <Button>
        <Typography variant={"body1"}>{t("addGradeCateogry")}</Typography>
      </Button>

      <Box sx={{ display: "none" }}>
        <Button
          ref={props.submitRef}
          type="submit"
          disabled={isLoading || !!errors.nameCourse}
        >
          <Typography>{t("submit")}</Typography>
        </Button>
      </Box>
    </form>
  );
};

export default ClassScoreForm;

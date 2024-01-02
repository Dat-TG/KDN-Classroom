import { TextField, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function MapStudentIdForm() {
  const { t } = useTranslation("global");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    studentId: string;
  }>();

  const onSubmit: SubmitHandler<{
    studentId: string;
  }> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={"flex"} flexDirection={"column"} gap={"16px"} width={"50%"}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", display: "block" }}
        >
          {t("studentId")}
        </Typography>
        <Controller
          defaultValue={""}
          name="studentId"
          control={control}
          rules={{
            required: true,
            maxLength: 50,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              hiddenLabel
              fullWidth
              variant="outlined"
              error={!!errors.studentId}
              helperText={errors.studentId ? t("requiredField") : ""}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth={false}
          sx={{
            width: "fit-content",
          }}
        >
          {t("save")}
        </Button>
      </Box>
    </form>
  );
}

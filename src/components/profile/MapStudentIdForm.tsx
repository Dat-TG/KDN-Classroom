import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getStudentId, setStudentId } from "../../api/user/apiUser";
import toast from "../../utils/toast";

export default function MapStudentIdForm() {
  const { t } = useTranslation("global");

  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{
    studentId: string;
  }>();

  useEffect(() => {
    getStudentId().then((res) => {
      if (res.length > 0) {
        setValue("studentId", res[0].code);
        setId(res[0].id);
      }
    });
  }, [setValue]);

  const onSubmit: SubmitHandler<{
    studentId: string;
  }> = async (data) => {
    setIsLoading(true);
    console.log(data);
    setStudentId({ id: id, studentId: data.studentId })
      .then(() => {
        setIsLoading(false);
        toast.success(t("updateStudentIdSuccessfully"));
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.detail.message);
      });
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
          name="studentId"
          defaultValue=""
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
          {isLoading ? <CircularProgress size={24} /> : t("save")}
        </Button>
      </Box>
    </form>
  );
}

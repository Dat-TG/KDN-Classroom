import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getStudentId, setStudentId } from "../../api/user/apiUser";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import toast from "../../utils/toast";

export default function MapStudentIdForm() {
  const { t } = useTranslation("global");

  const [isLoading, setIsLoading] = useState(false);

  const [studentId, setStudentIdState] = useState("");

  useEffect(() => {
    getStudentId().then((res) => {
      if (res.length > 0) setStudentIdState(res[0].code);
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    studentId: string;
  }>();

  const user = useSelector(sGetUserInfo);

  const onSubmit: SubmitHandler<{
    studentId: string;
  }> = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      await setStudentId({ id: user?.id, studentId: data.studentId });
    } catch (error) {
      toast.error(error as string);
      console.log(error);
    }
    setIsLoading(false);
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
          control={control}
          rules={{
            required: true,
            maxLength: 50,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              hiddenLabel
              value={studentId}
              onChange={(e) => setStudentIdState(e.target.value)}
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

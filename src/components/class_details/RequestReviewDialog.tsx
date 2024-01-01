import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";

interface Props {
  open: boolean;
  onClose: () => void;
  gradeScale: {
    name: string;
    scale: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grades: any[];
}

export default function RequestReviewDialog(props: Props) {
  const { t } = useTranslation("global");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    setIsLoading(false);
  };

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
        <DialogTitle display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
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
              <Typography> {t("requestGradeReview")}</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              onSubmit();
            }}
            disabled={false}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
            ) : (
              t("submit")
            )}
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
          <ReactTabulator
            data={props.gradeScale.map((gradeScale) => {
              return {
                name: gradeScale.name,
                scale: gradeScale.scale,
                currentGrade:
                  props.grades.find((e) => e[gradeScale.name])?.[
                    gradeScale.name
                  ] ?? 0,
                expectedGrade: 0,
                explain: "",
              };
            })}
            options={{
              layout: "fitDataTable",
              height: "auto",
            }}
            columns={[
              {
                title: "Name",
                field: "name",
                sorter: "string",
              },
              {
                title: "Scale",
                field: "scale",
                sorter: "number",
              },
              {
                title: "Current grade",
                field: "currentGrade",
                sorter: "number",
              },
              {
                title: "Expected grade",
                field: "expectedGrade",
                editable: true,
                editor: "number",
                sorter: "number",
              },
              {
                title: "Explain",
                field: "explain",
                formatter: "textarea",
                editable: true,
                editor: "textarea",
                sorter: "string",
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

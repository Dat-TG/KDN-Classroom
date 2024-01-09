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
import { useRef, useState } from "react";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { Tabulator } from "react-tabulator/lib/types/TabulatorTypes";
import { IRequestReviewReq } from "../../types/grade";
import { requestGradeReview } from "../../api/grade/apiGrade";
import toast from "../../utils/toast";

interface Props {
  courseId: number;
  open: boolean;
  onClose: () => void;
  gradeScale: {
    name: string;
    scale: number;
    id: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grades: any[];
}

export default function RequestReviewDialog(props: Props) {
  const { t } = useTranslation("global");

  const [isLoading, setIsLoading] = useState(false);

  let tableRef = useRef<Tabulator | null>(null);

  const onSubmit = () => {
    setIsLoading(true);
    const data = tableRef?.current?.getData().map((e) => {
      return {
        id: 0,
        courseId: props.courseId,
        currentGrade: parseFloat(e.currentGrade),
        expectGrade: e.expectedGrade,
        explanation: e.explain ?? "No explaination",
        gradeId: e.gradeId,
        studentCode: e.studentCode,
      } as IRequestReviewReq;
    });
    console.log(data);
    requestGradeReview(data!)
      .then(() => {
        toast.success(t("requestGradeReviewSuccessfully"));
        props.onClose();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        let message = "";
        for (let i = 0; i < err.detail.message.length; i++) {
          message += err.detail.message[i] + "\n";
        }
        toast.error(message);
        setIsLoading(false);
      });
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
            onRef={(ref) => (tableRef = ref)}
            data={props.gradeScale.map((gradeScale) => {
              return {
                name: gradeScale.name,
                scale: gradeScale.scale,
                currentGrade:
                  props.grades.find((e) => e[gradeScale.id.toString()])?.[
                    gradeScale.id.toString()
                  ] ?? 0,
                expectedGrade: 0,
                explain: "",
                gradeId: props.grades.find(
                  (e) => e[gradeScale.id.toString() + "grade"]
                )?.[gradeScale.id.toString() + "grade"],
                studentCode: props.grades[0].studentId,
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
              {
                title: "Grade id",
                field: "gradeId",
                visible: false,
              },
              {
                title: "Student code",
                field: "studentCode",
                visible: false,
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

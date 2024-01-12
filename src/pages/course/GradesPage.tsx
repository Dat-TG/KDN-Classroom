import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { IGetCoursesRes } from "../../types/course";

import {
  CellComponent,
  ColumnDefinition,
  RowComponent,
  TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import RequestReviewDialog from "../../components/class_details/RequestReviewDialog";
import { Reviews, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  deleteGradeScale,
  deleteMultipleGrades,
  getGradeBoard,
  getGradeOfStudent,
  getGradeScale,
  markGradeScaleAsFinalized,
  updateGradeBoard,
  updateGradeScales,
} from "../../api/grade/apiGrade";
import {
  IGradeBoard,
  IGradeScale,
  IGradeScaleWithFinalized,
} from "../../types/grade";
import toast from "../../utils/toast";
import UserInfoDialog from "../../components/profile/UserInfoDialog";
import { getProfileByStudentId } from "../../api/user/apiUser";
import ConfirmationDialog from "../../components/common/ConfirmDialog";
import DownloadFileButton from "../../components/class_details/DownloadFileButton";
import DownloadTabulatorButton from "../../components/class_details/DownloadTabulatorButton";
import DownloadDataButton from "../../components/class_details/DownloadDataButton";
import ImportGrades from "../TestUpload/ImportGrades";

interface Props {
  colorTheme: string;
  classEntity: IGetCoursesRes;
  teacherIds: number[];
  studentIds: number[];
  ownerId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GradesPage({ classEntity, studentIds }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gradesData, setGradesData] = useState<any[]>([]);
  const gradeTableRef = useRef(null);
  const gradeScaleTableRef = useRef(null);
  const { t } = useTranslation("global");
  const [gradeScaleTable, setGradeScaleTable] = useState<Tabulator | null>(
    null
  );
  const [gradesTable, setGradesTable] = useState<Tabulator | null>(null);

  const [selectedGradeScale, setSelectedGradeScale] = useState<RowComponent[]>(
    []
  );
  const [selectedStudent, setSelectedStudent] = useState<RowComponent[]>([]);

  const [gradeScaleData, setGradeScaleData] = useState<
    IGradeScaleWithFinalized[]
  >([] as IGradeScaleWithFinalized[]);

  const [isStudent, setIsStudent] = useState<boolean>(false);
  const user = useSelector(sGetUserInfo);

  const [isOpenRequestDialog, setIsOpenRequestDialog] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const [openUserDialog, setOpenUserDialog] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState({} as any);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedCell, setSelectedCell] = useState<CellComponent>();

  const onSave = async () => {
    const gradeScaleTemp: IGradeScale[] = gradeScaleData.map((grade) => {
      const position = gradeScaleTable?.getRows().findIndex((row) => {
        return row.getData().id === grade.id;
      });
      return {
        title: grade.title,
        scale: parseFloat(grade.scale.toString()),
        id: grade.id,
        courseId: classEntity.courseId,
        position: position != undefined ? position + 1 : 0,
      };
    });
    console.log("gradeScaleTemp", gradeScaleTemp);
    updateGradeScales(gradeScaleTemp)
      .then((res) => {
        toast.success(res.message);
        gradeScaleTable?.clearHistory();
        gradesTable?.clearHistory();
        const grades = gradesTable?.getData() ?? [];
        console.log("gradesTable", gradesTable?.getData());
        const gradesTemp = grades.map((grade) => {
          const position = gradesTable?.getRows().findIndex((row) => {
            return row.getData().studentId === grade.studentId;
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const temp: any = {
            studentId: grade.studentId,
            firstName: grade.firstName,
            lastName: grade.lastName,
            average: grade.average,
            position: position != undefined ? position + 1 : 0,
          };
          for (let i = 0; i < gradeScaleTemp.length; i++) {
            temp[gradeScaleTemp[i].id.toString()] =
              grade[gradeScaleTemp[i].id.toString()];
            temp[gradeScaleTemp[i].id.toString() + "grade"] =
              grade[gradeScaleTemp[i].id.toString() + "grade"];
            if (gradeScaleTemp[i].id == 0) {
              delete temp[gradeScaleTemp[i].id.toString()];
              temp[gradeScaleTemp[i].title] = grade[gradeScaleTemp[i].title];
            }
          }
          return temp;
        });
        const gradeBoardTemp: IGradeBoard[] = [];
        for (let i = 0; i < gradesTemp.length; i++) {
          for (let j = 0; j < gradeScaleTemp.length; j++) {
            if (gradeScaleTemp[j].id == 0) {
              continue;
            }
            gradeBoardTemp.push({
              id: gradesTemp[i][gradeScaleTemp[j].id.toString() + "grade"] || 0,
              courseId: classEntity.courseId,
              studentCode: gradesTemp[i].studentId,
              name: gradesTemp[i].firstName ?? "",
              surname: gradesTemp[i].lastName ?? "",
              grade: parseFloat(gradesTemp[i][gradeScaleTemp[j].id.toString()]),
              gradeScaleId: gradeScaleTemp[j].id,
              position: gradesTemp[i].position,
            });
          }
        }
        console.log("gradesTemp", gradeBoardTemp);
        updateGradeBoard(gradeBoardTemp)
          .then((res) => {
            toast.success(res.message);
          })
          .catch((err) => {
            toast.error(err.detail.message);
          });
      })
      .catch((err) => {
        toast.error(err.detail.message);
      });
  };

  useEffect(() => {
    document.title = `${classEntity.course.nameCourse} - ${classEntity.course.topic}`;

    let gradeTable: Tabulator;
    let gradeScaleTable: Tabulator;
    let gradeScale: IGradeScaleWithFinalized[] = [];
    const isStudent = studentIds.includes(user?.id || 0);
    setIsStudent(isStudent);
    console.log("isStudent", isStudent);
    getGradeScale(classEntity.courseId).then((res) => {
      gradeScale = res.gradeScales as IGradeScaleWithFinalized[];
      gradeScale.sort((a, b) => {
        return a.position - b.position;
      });
      setGradeScaleData(gradeScale);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let grades: any[] = [];
      const processGrades = async () => {
        if (isStudent) {
          try {
            const res = await getGradeOfStudent(classEntity.courseId);

            console.log("res", res);
            if (res.gradesBoard.length == 0) {
              return;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const temp: any = {
              studentId: res.gradesBoard[0].studentCode,
              firstName: res.gradesBoard[0].name,
              lastName: res.gradesBoard[0].surname,
              average: 0,
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (let i = 0; i < res.gradesBoard.length; i++) {
              temp[res.gradesBoard[i].gradeScaleId.toString()] =
                res.gradesBoard[i].grade;
              temp[res.gradesBoard[i].gradeScaleId.toString() + "grade"] =
                res.gradesBoard[i].id;
            }
            for (let i = 0; i < gradeScale.length; i++) {
              if (temp[gradeScale[i].id.toString()] == undefined) {
                temp[gradeScale[i].id.toString()] = 0;
              }
            }
            grades.push(temp);
            console.log("grades", grades);
            setGradesData(grades);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
            console.log("err", err);
            toast.error(err.detail.message);
          }
        } else {
          const res_1 = await getGradeBoard(classEntity.courseId);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          grades = res_1.gradesBoard.data.map((e: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const temp: any = {
              studentId: e.codeUser,
              firstName: e.gradeData[0].gradeData.name,
              lastName: e.gradeData[0].gradeData.surname,
              average: 0,
              position: e.gradeData[0].gradeData.position,
            };
            for (let i = 0; i < e.gradeData.length; i++) {
              temp[e.gradeData[i].gradeData.gradeScaleId.toString()] =
                e.gradeData[i].gradeData.grade;
              temp[e.gradeData[i].gradeData.gradeScaleId.toString() + "grade"] =
                e.gradeData[i].gradeData.id;
            }
            for (let i_1 = 0; i_1 < gradeScale.length; i_1++) {
              if (temp[gradeScale[i_1].id.toString()] == undefined) {
                temp[gradeScale[i_1].id.toString()] = 0;
              }
            }
            return temp;
          });
          const groupedByStudentCode =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            res_1.gradesBoard.gradesBoardDesist.reduce((acc: any, obj: any) => {
              const studentCode = obj.studentCode;
              if (!acc[studentCode]) {
                acc[studentCode] = [];
              }
              acc[studentCode].push(obj);
              return acc;
            }, {});
          const groupedArray = Object.entries(groupedByStudentCode).map(
            ([key, value_2]) => ({
              studentCode: key,
              data: value_2,
            })
          );
          console.log("groupedArray", groupedArray);
          grades = [
            ...grades,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...groupedArray.map((e_1: any) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const temp_1: any = {
                studentId: e_1.studentCode,
                firstName: e_1.data[0].name,
                lastName: e_1.data[0].surname,
                position: e_1.data[0].position,
                average: 0,
              };
              for (let i_2 = 0; i_2 < e_1.data.length; i_2++) {
                temp_1[e_1.data[i_2].gradeScaleId.toString()] =
                  e_1.data[i_2].grade;
                temp_1[e_1.data[i_2].gradeScaleId.toString() + "grade"] =
                  e_1.data[i_2].id;
              }
              for (let i_3 = 0; i_3 < gradeScale.length; i_3++) {
                if (temp_1[gradeScale[i_3].id.toString()] == undefined) {
                  temp_1[gradeScale[i_3].id.toString()] = 0;
                }
              }
              return temp_1;
            }),
          ];
          grades.sort((a, b) => {
            return a.position - b.position;
          });
          console.log("grades", grades);
          setGradesData(grades);
        }
      };
      processGrades().then(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const avgMutator = function (_value: any, data: any) {
          //value - original value of the cell
          //data - the data for the row
          //type - the type of mutation occurring  (data|edit)
          //params - the mutatorParams object from the column definition
          //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
          let average = 0;
          for (let i = 0; i < gradeScale.length; i++) {
            if (
              !isNaN(data[gradeScale[i].id.toString()]) &&
              !isNaN(gradeScale[i].scale)
            ) {
              average +=
                data[gradeScale[i].id.toString()] * gradeScale[i].scale;
            }
            if (
              !isNaN(data[gradeScale[i].title]) &&
              !isNaN(gradeScale[i].scale)
            ) {
              average += data[gradeScale[i].title] * gradeScale[i].scale;
            }
          }
          //set the average field value to the average of the other two fields
          return average; //return the new value for the cell data.
        };
        if (gradeTableRef && gradeTableRef.current) {
          // Initialize Tabulator
          let columnDefinitions: ColumnDefinition[] = isStudent
            ? []
            : [
                {
                  title: "",
                  rowHandle: true,
                  formatter: "handle",
                  headerSort: false,
                  frozen: true,
                },
                {
                  title: "",
                  formatter: "rowSelection",
                  titleFormatter: "rowSelection",
                  hozAlign: "center",
                  vertAlign: "middle",
                  headerHozAlign: "center",
                  headerSort: false,
                },
              ];
          columnDefinitions = [
            ...columnDefinitions,
            ...([
              {
                title: "Student ID",
                field: "studentId",
                editable: !isStudent,
                editor: "input",
                cellDblClick: function (_e, cell) {
                  setOpenUserDialog(true);
                  getProfileByStudentId(cell.getValue())
                    .then((res) => {
                      setSelectedUser({
                        name: res.user.name + " " + res.user.surname,
                        avatar: res.user.avatar,
                        email: res.user.userName,
                        studentId: cell.getValue(),
                      });
                    })
                    .catch((err) => {
                      toast.error(err.detail.message);
                      setSelectedUser({ notFound: true });
                    });
                },
              },
              {
                title: "First name",
                field: "firstName",
                editable: !isStudent,
                editor: "input",
              },
              {
                title: "Last name",
                field: "lastName",
                editable: !isStudent,
                editor: "input",
              },
            ] as ColumnDefinition[]),
          ];
          for (let i = 0; i < gradeScale.length; i++) {
            if (!isStudent || gradeScale[i].isFinalized)
              columnDefinitions.push({
                title: gradeScale[i].title,
                field: gradeScale[i].id.toString(),
                editable: !isStudent,
                editor: "number",
                sorter: "number",
              });
          }
          columnDefinitions.push({
            title: "Average",
            field: "average",
            editable: !isStudent,
            editor: "number",
            sorter: "number",
            mutator: avgMutator,
            formatter(cell) {
              //cell - the cell component
              //formatterParams - parameters set for the column
              //onRendered - function to call when the formatter has been rendered
              return cell.getValue().toFixed(1);
            },
          });
          console.log("grades add table", grades);
          gradeTable = new Tabulator(gradeTableRef.current, {
            movableRows: !isStudent,
            movableColumns: !isStudent,
            data: grades,
            layout: "fitDataTable",
            history: true,
            cellEdited: (cell) => {
              // This function will be called whenever a cell is edited
              console.log("Cell edited:", cell);
              // You can perform your logic here when a cell is edited
            },
            columns: columnDefinitions,
          });

          setGradesTable(gradeTable);

          gradeTable.on("dataChanged", function (data) {
            setGradesData(data);
            console.log("gradesData", data);
          });
          gradeTable.on("rowSelectionChanged", function (_data, rows) {
            //rows - array of row components for the currently selected rows in order of selection
            //data - array of data objects for the currently selected rows in order of selection
            //selected - array of row components that were selected in the last action
            //deselected - array of row components that were deselected in the last action
            setSelectedStudent(rows);
          });
          gradeTable.on("cellEdited", function (cell) {
            if (!isNaN(cell.getValue())) {
              cell.getRow().update({
                average: avgMutator(null, cell.getRow().getData()),
              });
            }
          });
          gradeTable.on("rowDeleted", function (row) {
            //row - row component
            console.log(
              "Row: " +
                row.getData().firstName +
                " " +
                row.getData().lastName +
                " " +
                row.getData().studentId +
                " has been deleted"
            );
            const ids = [];
            const rowData = row.getData();
            for (let i = 0; i < gradeScale.length; i++) {
              ids.push(
                parseInt(rowData[gradeScale[i].id.toString() + "grade"])
              );
            }
            console.log("ids", ids);
            deleteMultipleGrades(ids)
              .then(() => {
                console.log("delete grade board row", row.getData());
                gradeTable.clearHistory();
              })
              .catch((err) => {
                toast.error(err.detail.message);
                gradeTable?.addRow(row.getData());
              });
          });
        }

        if (gradeScaleTableRef && gradeScaleTableRef.current) {
          // Initialize Tabulator
          const columnDefinitions: ColumnDefinition[] = isStudent
            ? []
            : [
                {
                  title: "",
                  rowHandle: true,
                  formatter: "handle",
                  headerSort: false,
                  frozen: true,
                },
              ];
          gradeScaleTable = new Tabulator(gradeScaleTableRef.current, {
            movableRows: true,
            history: true,
            movableColumns: true,
            data: gradeScale,
            layout: "fitDataTable",
            cellEdited: (cell) => {
              // This function will be called whenever a cell is edited
              console.log("Cell edited:", cell);
              // You can perform your logic here when a cell is edited
            },
            columns: [
              ...columnDefinitions,
              ...([
                {
                  title: "",
                  formatter: "rowSelection",
                  titleFormatter: "rowSelection",
                  hozAlign: "center",
                  vertAlign: "middle",
                  headerHozAlign: "center",
                  headerSort: false,
                },
                {
                  title: "",
                  formatter: "rownum",
                  field: "position",
                  hozAlign: "center",
                  vertAlign: "middle",
                  headerHozAlign: "center",
                  headerSort: false,
                  visible: false,
                },
                {
                  title: "ID",
                  field: "id",
                  visible: false,
                  sorter: "number",
                },
                {
                  title: "Name",
                  field: "title",
                  editable: true,
                  editor: "input",
                },
                {
                  title: "Scale",
                  field: "scale",
                  editable: true,
                  editor: "number",
                  editorParams: {
                    min: 0,
                    step: 0.1,
                  },
                  sorter: "number",
                },
                {
                  title: "Finalized",
                  field: "isFinalized",
                  editable: !isStudent,
                  editor: "tickCross",
                  formatter: "tickCross",
                  cellEdited: function (cell) {
                    console.log("cell", cell);
                    if (cell.getValue()) {
                      setOpenConfirmationDialog(true);
                      setSelectedCell(cell);
                    } else {
                      cell.restoreOldValue();
                    }
                  },
                },
              ] as ColumnDefinition[]),
            ],
          });
          setGradeScaleTable(gradeScaleTable);
          gradeScaleTable.on("dataChanged", function (data) {
            setGradeScaleData(data);
          });
          gradeScaleTable.on(
            "rowSelectionChanged",
            function (_data, rows, selected) {
              //rows - array of row components for the currently selected rows in order of selection
              //data - array of data objects for the currently selected rows in order of selection
              //selected - array of row components that were selected in the last action
              //deselected - array of row components that were deselected in the last action
              for (let i = 0; i < selected.length; i++) {
                if (selected[i].getData().isFinalized == false) {
                  selected[i].deselect();
                  toast.error(t("selectFinalizedGradeScaleAlert"));
                }
              }
              setSelectedGradeScale(rows.filter((row) => row.isSelected()));
            }
          );

          gradeScaleTable.on("rowDeleted", function (row) {
            //row - row component
            console.log(
              "Row: " +
                row.getData().title +
                " " +
                row.getData().id +
                " has been deleted"
            );
            deleteGradeScale(row.getData().id)
              .then(() => {
                gradeTable
                  ?.deleteColumn(row.getData().id.toString())
                  .then(() => {
                    const rows = gradeTable?.getRows();
                    for (let i = 0; i < rows.length; i++) {
                      rows[i].update({
                        average: avgMutator(null, rows[i].getData()),
                      });
                    }
                    gradeScaleTable.clearHistory();
                  });
              })
              .catch((err) => {
                toast.error(err.detail.message);
                gradeScaleTable?.addRow(row.getData());
              });
          });
          gradeScaleTable.on("cellEdited", function (cell) {
            //cell - cell component
            console.log(
              "Cell edited:",
              cell.getField(),
              cell.getValue(),
              cell.getOldValue()
            );
            console.log("when edited", gradeScale);
            if (cell.getField() === "title") {
              let isExist = false;
              gradeTable.setColumns(
                gradeTable.getColumnDefinitions().map((col) => {
                  const oldId = gradeScale
                    .find((grade) => {
                      return grade.title === cell.getValue();
                    })
                    ?.id.toString();
                  console.log("oldId", oldId);
                  console.log("old value", cell.getOldValue());
                  console.log("gradeScale", gradeScale);
                  if (col.field === oldId && col.field != undefined) {
                    col.title = cell.getValue();
                    col.field = oldId;
                    isExist = true;
                  }
                  return col;
                })
              );

              if (!isExist) {
                gradeTable.addColumn(
                  {
                    title: cell.getValue(),
                    field: cell.getValue(),
                    editable: true,
                    editor: "number",
                    sorter: "number",
                  },
                  true,
                  "average"
                );
                console.log("not exist", cell.getValue());
                gradeScale.push({
                  title: cell.getValue(),
                  scale: cell.getRow().getData().scale || 0,
                  id: 0,
                  courseId: classEntity.courseId,
                  position: cell.getRow().getData().position,
                  isFinalized: cell.getRow().getData().isFinalized,
                });

                gradeTable.setData(grades);
              } else {
                grades.forEach((grade) => {
                  grade[cell.getValue()] = grade[cell.getOldValue()];
                  delete grade[cell.getOldValue()];
                });
                gradeTable.setData(grades);
              }
            }
            if (cell.getField() === "scale") {
              let isExist = false;
              gradeScale.forEach((grade) => {
                if (grade.title === cell.getRow().getData().title) {
                  grade.scale = cell.getValue();
                  isExist = true;
                  return true;
                }
              });
              if (!isExist) {
                gradeScale.push({
                  title: cell.getRow().getData().title,
                  scale: cell.getValue(),
                  id: 0,
                  courseId: classEntity.courseId,
                  position: cell.getRow().getData().position,
                  isFinalized: cell.getRow().getData().isFinalized,
                });
              }

              gradeTable.setData(grades);
            }
          });
        }
      });
    });

    // Cleanup when component unmounts
    return () => {
      gradeScaleTable?.destroy();
      gradeTable?.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <Box display={"flex"} gap={"16px"}>
        <Button
          component="label"
          variant="contained"
          sx={{
            marginBottom: "16px",
            background: classEntity.course.courseColor,
            ":focus": {
              background: classEntity.course.courseColor,
              opacity: 0.8,
            },
            ":hover": {
              background: classEntity.course.courseColor,
              opacity: 0.8,
            },
          }}
          startIcon={<Reviews />}
          onClick={() => {
            let pathname = window.location.pathname;
            while (pathname.endsWith("/")) {
              pathname = pathname.substring(0, pathname.length - 1);
            }
            if (isStudent) {
              navigate(
                pathname + `/student-requests?courseId=${classEntity.courseId}`
              );
            } else {
              navigate(
                pathname + `/teacher-requests?courseId=${classEntity.courseId}`
              );
            }
          }}
        >
          {t("yourRequest")}
        </Button>
        <Button
          component="label"
          variant="outlined"
          sx={{
            display: isStudent ? "none" : "inline-flex",
            marginBottom: "16px",
            color: classEntity.course.courseColor,
            borderColor: classEntity.course.courseColor,
            ":focus": {
              borderColor: classEntity.course.courseColor,
            },
            ":hover": {
              borderColor: classEntity.course.courseColor,
            },
          }}
          startIcon={<Save />}
          onClick={onSave}
        >
          {t("saveChanges")}
        </Button>
        <div
          style={{
            display: isStudent ? "none" : "inline-flex",
          }}
        >
          <DownloadFileButton colorTheme={classEntity.course.courseColor} />
        </div>
        <div
          style={{
            display: isStudent ? "none" : "inline-flex",
          }}
        >
          <DownloadDataButton
            colorTheme={classEntity.course.courseColor}
            gradeData={gradesData}
            gradeScaleData={gradeScaleData}
          />
        </div>
        <div
          style={{
            display: isStudent ? "none" : "inline-flex",
          }}
        >
          <ImportGrades colorTheme={classEntity.course.courseColor} />
        </div>
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant={"h5"}>{t("gradeScaleTable")}</Typography>
        <DownloadTabulatorButton
          colorTheme={classEntity.course.courseColor}
          onDownloadCSV={() => {
            gradeScaleTable?.download("csv", "gradeScale.csv", { bom: true });
          }}
          onDownloadXLSX={() => {
            gradeScaleTable?.download("xlsx", "gradeScale.xlsx");
          }}
        />
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            visibility: isStudent ? "hidden" : "visible",
          }}
          onClick={() => {
            gradeScaleTable?.addRow({});
          }}
        >
          {t("addGradeScale")}
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            visibility: isStudent ? "hidden" : "visible",
          }}
          onClick={() => {
            gradeScaleTable?.undo();
          }}
        >
          {t("undo")}
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            visibility: isStudent ? "hidden" : "visible",
          }}
          onClick={() => {
            gradeScaleTable?.redo();
          }}
        >
          {t("redo")}
        </Button>
      </div>
      {selectedGradeScale.length > 0 && (
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          {isStudent ? (
            <Button
              variant="outlined"
              color="info"
              onClick={() => {
                setIsOpenRequestDialog(true);
              }}
            >
              {t("requestGradeReviewForSelectedComposition")}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => {
                if (
                  window.confirm(
                    `${t("deleteRowAlert")} ${selectedGradeScale.length} ${t(
                      "gradeScale"
                    )}?`
                  )
                ) {
                  for (let i = 0; i < selectedGradeScale.length; i++) {
                    selectedGradeScale[i].delete();
                  }
                  setSelectedGradeScale([]);
                }
              }}
            >
              {`${t("delete")} ${selectedGradeScale.length} ${t("gradeScale")}`}
            </Button>
          )}
        </div>
      )}
      <div ref={gradeScaleTableRef} />
      {gradeScaleTable == null && <CircularProgress />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          marginBottom: "16px",
          marginTop: "16px",
        }}
      >
        <Typography variant={"h5"}>{t("gradesTable")}</Typography>
        <DownloadTabulatorButton
          colorTheme={classEntity.course.courseColor}
          onDownloadCSV={() => {
            gradesTable?.download("csv", "gradeBoard.csv", { bom: true });
          }}
          onDownloadXLSX={() => {
            gradesTable?.download("xlsx", "gradeBoard.xlsx");
          }}
        />
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            display: isStudent ? "none" : "block",
          }}
          onClick={() => {
            gradesTable?.addRow({});
          }}
        >
          {t("addStudent")}
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            display: isStudent ? "none" : "block",
          }}
          onClick={() => {
            gradesTable?.undo();
          }}
        >
          {t("undo")}
        </Button>
        <Button
          variant="text"
          color="primary"
          sx={{
            padding: "8px",
            display: isStudent ? "none" : "block",
          }}
          onClick={() => {
            gradesTable?.redo();
          }}
        >
          {t("redo")}
        </Button>
      </div>
      {selectedStudent.length > 0 && (
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              if (
                window.confirm(
                  `${t("deleteRowAlert")} ${selectedStudent.length} ${t(
                    "student"
                  )}?`
                )
              ) {
                for (let i = 0; i < selectedStudent.length; i++) {
                  selectedStudent[i].delete();
                }
                setSelectedStudent([]);
              }
            }}
          >
            {`${t("delete")} ${selectedStudent.length} ${t("student")}`}
          </Button>
        </div>
      )}
      <div ref={gradeTableRef} />
      {gradesTable == null && <CircularProgress />}
      {isStudent && (
        <RequestReviewDialog
          open={isOpenRequestDialog}
          courseId={classEntity.courseId}
          onClose={() => {
            setIsOpenRequestDialog(false);
          }}
          gradeScale={selectedGradeScale
            .filter((value) => value.getData().isFinalized == true)
            .map((row) => {
              return {
                id: row.getData().id,
                name: row.getData().title,
                scale: row.getData().scale,
              };
            })}
          grades={gradesData}
        />
      )}
      <UserInfoDialog
        open={openUserDialog}
        handleClose={() => setOpenUserDialog(false)}
        user={selectedUser}
      />
      <ConfirmationDialog
        key={"finalizedDialog"}
        open={openConfirmationDialog}
        onClose={() => {
          selectedCell?.restoreOldValue();
          setOpenConfirmationDialog(false);
        }}
        content={t("confirmMakeFinalized")}
        onConfirm={async () => {
          markGradeScaleAsFinalized(
            classEntity.courseId,
            selectedCell?.getRow().getData().id
          )
            .then((res) => {
              toast.success(res.message);
              gradeScaleTable?.clearHistory();
              setOpenConfirmationDialog(false);
            })
            .catch((err) => {
              toast.error(err.detail.message);
              selectedCell?.restoreOldValue();
              setOpenConfirmationDialog(false);
            });
        }}
      />
    </div>
  );
}

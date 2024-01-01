import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { IGetCoursesRes } from "../types/course";
// import { IUserProfileRes } from "../types/user";
// import { getUserById } from "../api/user/apiUser";

import {
  ColumnDefinition,
  RowComponent,
  TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../store/user/selector";

interface Props {
  colorTheme: string;
  classEntity: IGetCoursesRes;
  teacherIds: number[];
  studentIds: number[];
  ownerId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GradesPage({ studentIds }: Props) {
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

  const [gradeScale, setGradeScale] = useState([
    {
      name: "Midterm",
      scale: 0.3,
    },
    {
      name: "Final",
      scale: 0.7,
    },
  ]);

  const [isStudent, setIsStudent] = useState<boolean>(false);
  const user = useSelector(sGetUserInfo);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [_grades, setGrades] = useState<any[]>([]);

  useEffect(() => {
    const isStudent = studentIds.includes(user?.id || 0);
    setIsStudent(isStudent);
    console.log("isStudent", isStudent);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let grades: any[] = [];
    if (isStudent) {
      grades = [
        {
          studentId: "20120454",
          firstName: user?.name,
          lastName: user?.surname,
          Midterm: 10,
          Final: 10,
          average: 10,
        },
      ];
    } else {
      grades = [
        {
          studentId: "20120454",
          firstName: "Đắt",
          lastName: "Lê Công",
          Midterm: 10,
          Final: 10,
          average: 10,
        },
        {
          studentId: "20120455",
          firstName: "Hoa",
          lastName: "Nguyễn Thị",
          Midterm: 9,
          Final: 8,
          average: 8.3,
        },
        {
          studentId: "20120456",
          firstName: "Tuấn",
          lastName: "Trần Văn",
          Midterm: 7,
          Final: 6,
          average: 6.3,
        },
        {
          studentId: "20120457",
          firstName: "Hằng",
          lastName: "Phạm Thị",
          Midterm: 5,
          Final: 4,
          average: 4.3,
        },
        {
          studentId: "20120458",
          firstName: "Minh",
          lastName: "Vũ Minh",
          Midterm: 8,
          Final: 9,
          average: 8.7,
        },
        {
          studentId: "20120459",
          firstName: "Nam",
          lastName: "Hoàng Văn",
          Midterm: 6,
          Final: 7,
          average: 6.7,
        },
        {
          studentId: "20120460",
          firstName: "Thảo",
          lastName: "Đặng Thị",
          Midterm: 9,
          Final: 9,
          average: 9,
        },
        {
          studentId: "20120461",
          firstName: "Long",
          lastName: "Nguyễn Văn",
          Midterm: 7,
          Final: 8,
          average: 7.7,
        },
        {
          studentId: "20120462",
          firstName: "Linh",
          lastName: "Trần Thị",
          Midterm: 8,
          Final: 6,
          average: 6.6,
        },
        {
          studentId: "20120463",
          firstName: "Hoàng",
          lastName: "Lê Văn",
          Midterm: 9,
          Final: 10,
          average: 9.7,
        },
      ];
    }
    setGrades(grades);
    let gradeTable: Tabulator;
    let gradeScaleTable: Tabulator;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avgMutator = function (_value: any, data: any) {
      //value - original value of the cell
      //data - the data for the row
      //type - the type of mutation occurring  (data|edit)
      //params - the mutatorParams object from the column definition
      //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
      let average = 0;
      for (let i = 0; i < gradeScale.length; i++) {
        if (!isNaN(data[gradeScale[i].name]) && !isNaN(gradeScale[i].scale)) {
          average += data[gradeScale[i].name] * gradeScale[i].scale;
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
            editable: true,
            editor: "input",
          },
          {
            title: "First name",
            field: "firstName",
            editable: true,
            editor: "input",
          },
          {
            title: "Last name",
            field: "lastName",
            editable: true,
            editor: "input",
          },
        ] as ColumnDefinition[]),
      ];
      for (let i = 0; i < gradeScale.length; i++) {
        columnDefinitions.push({
          title: gradeScale[i].name,
          field: gradeScale[i].name,
          editable: true,
          editor: "number",
          sorter: "number",
        });
      }
      columnDefinitions.push({
        title: "Average",
        field: "average",
        editable: true,
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

      //listen for row move
      gradeTable.on("rowMoved", function (row) {
        console.log("Row: " + row.getData().studentId + " has been moved");
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
    }

    if (gradeScaleTableRef && gradeScaleTableRef.current) {
      // Initialize Tabulator
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
          {
            title: "Name",
            field: "name",
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
        ],
      });
      setGradeScaleTable(gradeScaleTable);
      //listen for row move
      gradeScaleTable.on("rowMoved", function (row) {
        console.log("Row: " + row.getData().name + " has been moved");
      });
      gradeScaleTable.on("rowSelectionChanged", function (_data, rows) {
        //rows - array of row components for the currently selected rows in order of selection
        //data - array of data objects for the currently selected rows in order of selection
        //selected - array of row components that were selected in the last action
        //deselected - array of row components that were deselected in the last action
        setSelectedGradeScale(rows);
      });
      gradeScaleTable.on("rowDeleted", function (row) {
        //row - row component
        console.log("Row: " + row.getData().name + " has been deleted");
        gradeTable?.deleteColumn(row.getData().name).then(() => {
          const rows = gradeTable?.getRows();
          for (let i = 0; i < rows.length; i++) {
            rows[i].update({
              average: avgMutator(null, rows[i].getData()),
            });
          }
        });
        setGrades((prev) => {
          prev.forEach((grade) => {
            delete grade[row.getData().name];
          });
          return prev;
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
        if (cell.getField() === "name") {
          let isExist = false;
          gradeTable.setColumns(
            gradeTable.getColumnDefinitions().map((col) => {
              if (col.field === cell.getOldValue() && col.field != undefined) {
                col.title = cell.getValue();
                col.field = cell.getValue();
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
            setGradeScale((prev) => {
              prev.push({
                name: cell.getValue(),
                scale: cell.getRow().getData().scale || 0,
              });
              return prev;
            });
            gradeTable.setData(grades);
          } else {
            setGrades((prev) => {
              prev.forEach((grade) => {
                grade[cell.getValue()] = grade[cell.getOldValue()];
                delete grade[cell.getOldValue()];
              });
              gradeTable.setData(prev);
              return prev;
            });
          }
        }
        if (cell.getField() === "scale") {
          setGradeScale((prev) => {
            let isExist = false;
            prev.forEach((grade) => {
              if (grade.name === cell.getRow().getData().name) {
                grade.scale = cell.getValue();
                isExist = true;
                return true;
              }
            });
            if (!isExist) {
              prev.push({
                name: cell.getRow().getData().name,
                scale: cell.getValue(),
              });
            }
            return prev;
          });

          gradeTable.setData(grades);
        }
      });
    }

    // Cleanup when component unmounts
    return () => {
      gradeScaleTable?.destroy();
      gradeTable?.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   getUserById(props.ownerId)
  //     .then((res) => {
  //       setOwner(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   for (let i = 0; i < props.teacherIds.length; i++) {
  //     getUserById(props.teacherIds[i])
  //       .then((res) => {
  //         setTeachers((prev) => {
  //           if (prev == null) return [res];
  //           return [...prev, res];
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   for (let i = 0; i < props.studentIds.length; i++) {
  //     getUserById(props.studentIds[i])
  //       .then((res) => {
  //         setStudents((prev) => {
  //           if (prev == null) return [res];
  //           return [...prev, res];
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [props.ownerId, props.studentIds, props.teacherIds]);

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
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
            <Button variant="outlined" color="info" onClick={() => {}}>
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
                  setGradeScale((prev) => {
                    const arr = prev.filter(
                      (gradeScale) =>
                        !selectedGradeScale
                          .map((row) => row.getData().name)
                          .includes(gradeScale.name)
                    );
                    return arr;
                  });
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
    </div>
  );
}

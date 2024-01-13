import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  RowComponent,
  TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import GradesSelector from "./GradesSelector";
import { useTranslation } from "react-i18next";
import { IGradeBoard, IGradeScale } from "../../types/grade";
import {
  getGradeScale,
  updateGradeBoard,
  updateGradeScales,
} from "../../api/grade/apiGrade";
import toast from "../../utils/toast";
// import ExportGrades from "./ExportGradesCSV";

type GradeScale = {
  [key: string]: number;
};

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  grades: GradeScale;
  position: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertStudents(studentArray: Student[]): any[] {
  return studentArray.map((student) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const convertedStudent: any = {
      firstName: student.firstName,
      lastName: student.lastName,
      studentId: student.studentId,
    };

    for (const gradeName in student.grades) {
      if (Object.prototype.hasOwnProperty.call(student.grades, gradeName)) {
        convertedStudent[gradeName] = student.grades[gradeName];
      }
    }

    return convertedStudent;
  });
}

// type ImportGradesProps = {
//     handleImport(students : Student[]): void;
// };

interface Props {
  colorTheme?: string;
  gradeScaleData: IGradeScale[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gradeData: any[];
  courseId: number;
  callback: () => void;
}

function combineGradeScale(
  oldArray: IGradeScale[],
  newArray: IGradeScale[],
  courseId: number
): IGradeScale[] {
  const combinedArray: IGradeScale[] = [];

  // Add elements from oldArray to combinedArray
  for (const oldItem of oldArray) {
    const matchingNewItem = newArray.find(
      (newItem) => newItem.title === oldItem.title
    );

    if (matchingNewItem) {
      // If title matches, use id from oldArray and other properties from newArray
      combinedArray.push({
        title: oldItem.title,
        scale: matchingNewItem.scale,
        id: oldItem.id,
        courseId: oldItem.courseId,
        position: matchingNewItem.position,
      });
    } else {
      // If no match found, simply add the oldItem to combinedArray
      combinedArray.push({
        title: oldItem.title,
        scale: parseFloat(oldItem.scale.toString()),
        id: oldItem.id,
        courseId: oldItem.courseId,
        position: oldItem.position,
      });
    }
  }

  // Add elements from newArray that do not have a matching title in oldArray
  for (const newItem of newArray) {
    const titleExistsInOldArray = oldArray.some(
      (oldItem) => oldItem.title === newItem.title
    );

    if (!titleExistsInOldArray) {
      combinedArray.push({
        title: newItem.title,
        scale: newItem.scale,
        id: 0,
        courseId: courseId,
        position: newItem.position,
      });
    }
  }

  return combinedArray;
}

function transformStudentObject(
  studentObject: Student,
  gradeScale: IGradeScale[],
  courseId: number
) {
  const gradesArray: IGradeBoard[] = [];

  // Iterate over each grade in the grades object
  for (const [gradeName, gradeValue] of Object.entries(studentObject.grades)) {
    const transformedObject = {
      id: 0, // You can set the appropriate values for these fields
      courseId: courseId,
      studentCode: studentObject.studentId,
      name: studentObject.firstName,
      surname: studentObject.lastName,
      grade: gradeValue,
      gradeScaleId: gradeScale.find((grade) => grade.title === gradeName)?.id,
      position: studentObject.position,
    };

    gradesArray.push(transformedObject as IGradeBoard);
  }

  return gradesArray;
}

function combineGradeData(
  gradeBoards: IGradeBoard[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grades: any[]
): IGradeBoard[] {
  const combinedArray: IGradeBoard[] = [];

  for (const gradeBoard of gradeBoards) {
    const studentId = gradeBoard.studentCode;
    const matchingGradeObject = grades.find(
      (grade) => grade.studentId === studentId
    );

    if (matchingGradeObject) {
      // Extract grade value from gradeObject based on the id
      const grade = parseFloat(gradeBoard.grade.toString());

      // Create a new IGradeBoard object
      const combinedObject: IGradeBoard = {
        id:
          matchingGradeObject[gradeBoard.gradeScaleId.toString() + "grade"] ??
          0,
        courseId: gradeBoard.courseId,
        studentCode: gradeBoard.studentCode,
        name: gradeBoard.name,
        surname: gradeBoard.surname,
        grade: grade,
        gradeScaleId: gradeBoard.gradeScaleId,
        position: gradeBoard.position,
      };

      combinedArray.push(combinedObject);
    } else {
      // If no matching grade object found, add the original grade board
      combinedArray.push(gradeBoard);
    }
  }

  for (const grade of grades) {
    if (grade["0grade"] != undefined) {
      const matchingGradeBoard = gradeBoards.find(
        (gradeBoard) => gradeBoard.studentCode === grade.studentId
      );
      if (matchingGradeBoard) {
        combinedArray.push({
          id: grade["0grade"],
          courseId: matchingGradeBoard.courseId,
          studentCode: matchingGradeBoard.studentCode,
          name: matchingGradeBoard.name,
          surname: matchingGradeBoard.surname,
          grade: parseFloat(grade["0"].toString()),
          gradeScaleId: 0,
          position: matchingGradeBoard.position,
        });
      }
    }
  }

  return combinedArray;
}

const ImportGrades = ({
  colorTheme,
  gradeScaleData,
  gradeData,
  courseId,
  callback,
}: Props) => {
  const { t } = useTranslation("global");
  const [gradeComponents, setGradeComponents] = useState<IGradeScale[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedGradeScales, setSelectedGradeScales] = useState<
    RowComponent[]
  >([]);
  const [selectedStudents, setSelectedStudent] = useState<RowComponent[]>([]);

  const [isDialogShowed, setIsDialogShowed] = useState<boolean>(false);

  const ShowDialog = () => {
    setIsDialogShowed(true);
  };

  const HideDialog = () => {
    setIsDialogShowed(false);
    setGradeComponents([]);
    setStudents([]);
    setSelectedGradeScales([]);
    setSelectedStudent([]);
  };

  const gradeTableRef = useRef(null);
  const gradeScaleTableRef = useRef(null);

  const handleDataFromSelector = (
    gradeComponents: IGradeScale[],
    students: Student[]
  ) => {
    setGradeComponents(gradeComponents);
    setStudents(students);
  };

  const ConfirmImport = () => {
    if (gradeComponents && gradeComponents.length > 0) {
      console.log(gradeComponents);
      const updateGradeScaleData = combineGradeScale(
        gradeScaleData,
        gradeComponents,
        courseId
      );
      console.log("update gradescale", updateGradeScaleData);
      updateGradeScales(updateGradeScaleData)
        .then(() => {
          toast.success(t("updateGradeScaleSuccessfully"));
          getGradeScale(courseId)
            .then((res) => {
              setGradeComponents(res.gradeScales);
              const newGradeScale = res.gradeScales as IGradeScale[];
              let transformedGradeData: IGradeBoard[] = [];
              for (const student of students) {
                transformedGradeData = transformedGradeData.concat(
                  transformStudentObject(student, newGradeScale, courseId)
                );
              }
              console.log("transformedGradeData", transformedGradeData);
              const updatedGradeData = combineGradeData(
                transformedGradeData,
                gradeData
              );
              console.log("updatedGradeData", updatedGradeData);
              updateGradeBoard(updatedGradeData)
                .then(() => {
                  toast.success(t("updateGradeBoardSuccessfully"));
                  callback();
                  HideDialog();
                })
                .catch((error) => {
                  toast.error(error.detail.message);
                });
            })
            .catch((error) => {
              toast.error(error.detail.message);
            });
        })
        .catch((error) => {
          toast.error(error.detail.message);
        });
    }

    // Handle import data here
    setIsDialogShowed(false);
  };

  useEffect(() => {
    if (students.length > 0 && gradeComponents.length > 0) {
      ShowDialog();
    }
  }, [gradeComponents, students]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    if (
      gradeTableRef &&
      gradeTableRef.current &&
      gradeScaleTableRef &&
      gradeScaleTableRef.current != null &&
      students.length > 0 &&
      gradeComponents.length > 0
    ) {
      // Initialize Tabulator
      const columnDefinitions: ColumnDefinition[] = [
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
      ];
      for (let i = 0; i < gradeComponents.length; i++) {
        columnDefinitions.push({
          title: gradeComponents[i].title,
          field: gradeComponents[i].title,
          editable: true,
          editor: "number",
          sorter: "number",
        });
      }

      const gradeTable = new Tabulator(gradeTableRef.current, {
        movableRows: true,
        movableColumns: true,
        data: convertStudents(students),
        layout: "fitDataTable",
        history: true,
        cellEdited: (cell) => {
          // This function will be called whenever a cell is edited
          console.log("Cell edited:", cell);
          // You can perform your logic here when a cell is edited
        },
        columns: columnDefinitions,
      });

      gradeTable.on("rowSelectionChanged", function (_data, rows) {
        //rows - array of row components for the currently selected rows in order of selection
        //data - array of data objects for the currently selected rows in order of selection
        //selected - array of row components that were selected in the last action
        //deselected - array of row components that were deselected in the last action
        setSelectedStudent(rows);
      });

      // Initialize Tabulator
      const gradeScaleTable = new Tabulator(gradeScaleTableRef.current, {
        movableRows: true,
        history: true,
        data: gradeComponents,
        layout: "fitDataTable",
        cellEdited: (cell) => {
          // This function will be called whenever a cell is edited
          console.log("Cell edited:", cell);
          // You can perform your logic here when a cell is edited
        },
        columns: [
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
        ],
      });

      gradeScaleTable.on("rowSelectionChanged", function (_data, rows) {
        //rows - array of row components for the currently selected rows in order of selection
        //data - array of data objects for the currently selected rows in order of selection
        //selected - array of row components that were selected in the last action
        //deselected - array of row components that were deselected in the last action
        setSelectedGradeScales(rows);
      });

      //Cleanup when component unmounts
      return () => {
        gradeScaleTable.destroy();
        gradeTable.destroy();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogShowed, gradeComponents, students]);

  const deleteSelectedGradeScales = () => {
    if (!selectedGradeScales) {
      return;
    }

    setGradeComponents((prevGradeComponents) => {
      if (!prevGradeComponents) {
        return prevGradeComponents;
      }

      const newGradeComponents = prevGradeComponents.filter(
        (gradeScale) =>
          !selectedGradeScales.some(
            (selected) => selected.getData().name === gradeScale.title
          )
      );

      return newGradeComponents;
    });

    // Clear selected rows
    setSelectedGradeScales([]);
  };

  const deleteSelectedStudents = () => {
    if (!selectedStudents) {
      return;
    }

    setStudents((prevStudents) => {
      if (!prevStudents) {
        return prevStudents;
      }
      const newStudents = prevStudents.filter(
        (student) =>
          !selectedStudents.some(
            (selected) => selected.getData().studentId === student.studentId
          )
      );
      return newStudents;
    });

    // Clear selected rows
    setSelectedStudent([]);
  };

  return (
    <div>
      <GradesSelector
        onChange={(gradeComponents, students) =>
          handleDataFromSelector(gradeComponents, students)
        }
        colorTheme={colorTheme}
      />

      <Dialog
        sx={{
          display: isDialogShowed ? "block" : "none",
          width: "100%",
          height: "auto",
        }}
        open={true}
        onClose={HideDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {t("importConfirmation")}
        </DialogTitle>
        <DialogContent sx={{ p: 0, ml: "24px", mr: "24px" }}>
          <Box
            sx={{ minHeight: "38px", display: "flex", alignItems: "flex-end" }}
          >
            <Typography variant="h6" sx={{ mr: 1, mb: 0 }} gutterBottom>
              {t("gradeComponents")}
            </Typography>
            {selectedGradeScales.length > 0 && (
              <Button
                variant="outlined"
                onClick={deleteSelectedGradeScales}
                sx={{ pr: "3px", pl: "3px", pt: 0, pb: 0 }}
              >
                {selectedGradeScales.length >= 2
                  ? `Delete ${selectedGradeScales.length} records`
                  : `Delete ${selectedGradeScales.length} record`}
              </Button>
            )}
          </Box>

          <Box
            ref={gradeScaleTableRef}
            sx={{ mt: 1, height: "auto", width: "auto" }}
          ></Box>

          <Box
            sx={{
              minHeight: "38px",
              mt: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="h6" sx={{ mr: 1, mb: 0 }} gutterBottom>
              {t("grades")}
            </Typography>
            {selectedStudents.length > 0 && (
              <Button
                variant="outlined"
                onClick={deleteSelectedStudents}
                sx={{ pr: "3px", pl: "3px", pt: 0, pb: 0 }}
              >
                {selectedStudents.length >= 2
                  ? `Delete ${selectedStudents.length} records`
                  : `Delete ${selectedStudents.length} record`}
              </Button>
            )}
          </Box>

          <Box
            ref={gradeTableRef}
            sx={{ mt: 1, mb: 1, height: "auto", width: "auto" }}
          ></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={HideDialog}> {t("cancel")}</Button>
          <Button onClick={ConfirmImport}>{t("import")}</Button>
        </DialogActions>
      </Dialog>

      {/* <ExportGrades students={students} gradeComponents={gradeComponents}/> */}
    </div>
  );
};

export default ImportGrades;

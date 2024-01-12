import React from "react";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import readXlsxFile from "read-excel-file";
import toast from "../../utils/toast";
import IosShareIcon from "@mui/icons-material/IosShare";

type GradeScale = {
  [key: string]: number;
};

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  grades: GradeScale;
  // average: number;
};

type GradeComponent = {
  name: string;
  scale: number;
};

type Props = {
  onChange(gradeComponents: GradeComponent[], students: Student[]): void;
  colorTheme?: string;
};

function parseRawData(csvData: string[][]): {
  gradeComponents: GradeComponent[];
  students: Student[];
} {
  const gradeComponents: GradeComponent[] = [];
  const students: Student[] = [];

  let isGradeScaleSection = true;
  let isStudentDataSection = false;

  for (const row of csvData) {
    if (isGradeScaleSection) {
      if (row[0] === "") {
        isGradeScaleSection = false;
        isStudentDataSection = true;
      } else if (row[0].toLowerCase() === "name") {
        // skip header row
      } else {
        const name = row[0].trim();
        const scale = parseFloat(row[1].trim());
        gradeComponents.push({ name, scale });
      }
    } else if (
      isStudentDataSection &&
      row[0] !== "" &&
      row[0].toLowerCase() !== "student id"
    ) {
      const studentId = row[0].trim();
      const firstName = row[1].trim();
      const lastName = row[2].trim();
      const grades: GradeScale = {};

      for (let i = 0; i < gradeComponents.length; i++) {
        grades[gradeComponents[i].name] = parseFloat(row[i + 3].trim());
      }

      // grades['Average'] = calculateAverage(grades, gradeComponents);

      students.push({ studentId, firstName, lastName, grades });
    }
  }
  return { gradeComponents, students };
}

function findEmptyRow(data: string[][]): number | null {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row.every((cell) => cell === "")) {
      return i;
    }
  }

  return null;
}

function isValidData(data: string[][]): boolean {
  console.log("data: ", data);
  // grade scale table header
  if (
    data[0][0].toLowerCase() !== "name" &&
    data[0][1].toLocaleLowerCase() !== "grade scale"
  ) {
    console.log("wrong grade scale header");
    return false;
  }

  const emptyRowIndex = findEmptyRow(data);

  if (emptyRowIndex == null || emptyRowIndex == data.length - 1) return false;

  // emptyRowIndex = header + numberOfGradeComponent + empty row -1
  // => numberOfGradeColumn = 3 + emptyRowIndex -1  = emptyRowIndex + 2
  if (data[emptyRowIndex + 1].length != emptyRowIndex + 2) return false;

  const numberOfGradeScale = data[emptyRowIndex + 1].length - 3;

  // Min number of rows = rows of grade scale + 2 header + 1 empty
  if (data.length < numberOfGradeScale + 3) {
    console.log("lack of information");
    return false;
  }
  let i;
  // grade scale rows
  for (i = 1; i < numberOfGradeScale + 1; i++) {
    if (data[i][0] === "") {
      console.log("empty name of grade scale");
      return false;
    }
    if (isNaN(Number(data[i][1]))) {
      console.log("scale is not a number");
      return false;
    }
  }

  if (!data[i].every((element) => element === "")) {
    console.log("not exist empty row");
    return false;
  }

  // grades table header
  i++;
  if (
    data[i][0].toLowerCase() != "student id" ||
    data[i][1].toLowerCase() != "first name" ||
    data[i][2].toLowerCase() != "last name"
  ) {
    console.log("wrong grade header");
    return false;
  }

  for (let j = 3; j < numberOfGradeScale + 3; j++) {
    if (data[i][j] != data[j - 3 + 1][0]) {
      console.log("wrong name of scale");
      return false;
    }
  }

  return true;
}

const GradesSelector = ({ onChange, colorTheme }: Props) => {
  const { t } = useTranslation("global");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];

        if (
          file &&
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          readXlsxFile(file).then((rows) => {
            rows = rows.map((row) =>
              row.map((cell) => (cell === null ? "" : cell.toString()))
            );
            const data: string[][] = [];
            rows.map((row) => {
              const rowArray: string[] = [];
              row.map((cell) => {
                rowArray.push(cell.toString());
              });
              data.push(rowArray);
            });
            handleRawData(data);
          });
        } else if (file.type == "text/csv") {
          Papa.parse(file, {
            complete: (result: Papa.ParseResult<string[]>) => {
              // result.data contains the parsed CSV data
              const data = result.data;
              handleRawData(data);
            },
            header: false, // Set to true if your CSV has a header row
          });
        }
      } catch (error) {
        console.error(error);
      }
      e.target.value = "";
    }
  };

  const handleRawData = (rawData: string[][]): void => {
    if (rawData.length == 0) {
      toast.error(t("emptyFile"));
    } else if (!isValidData(rawData)) {
      toast.error(t("wrongFormatImportFile"));
    } else {
      const { gradeComponents, students } = parseRawData(rawData);
      console.log("students: ", students);
      onChange(gradeComponents, students);
    }
  };

  return (
    <>
      <Button
        variant="text"
        component="label"
        sx={{
          color: colorTheme,
        }}
      >
        <IosShareIcon sx={{ mr: 1 }} />
        {t("importGradesFromFile")}
        <input
          id="CSVInput"
          hidden
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
};

export default GradesSelector;

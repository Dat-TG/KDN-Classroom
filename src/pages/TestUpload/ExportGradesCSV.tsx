import { Button } from "@mui/material";
import { useState } from "react";
import { CSVLink } from "react-csv";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type GradeScale = {
  [key: string]: number;
};

type Student = {
  studentId: string;
  firstName: string;
  lastName: string;
  grades: GradeScale;
};

type GradeComponent = {
  name: string;
  scale: number;
};

type ImportGradesProps = {
  students: Student[] ;
  gradeComponents: GradeComponent[] | null;
};

const ExportGrades = (props: ImportGradesProps) => {
  const [headers, setHeaders] = useState<{ label: string; key: string }[]>([]);

  const handleExportData = () => {
    const headers: { label: string; key: string }[] = [];
    if (props.students && props.gradeComponents) {
      headers.push({ label: "Id", key: "studentId" });
      headers.push({ label: "First Name", key: "firstName" });
      headers.push({ label: "Last Name", key: "lastName" });

      props.gradeComponents.forEach((gradeComponent) => {
        headers.push({
          label: gradeComponent.name,
          key: "grades." + gradeComponent.name,
        });
      });
    }

    setHeaders(headers);
  };

  return (
    <>
      <Button variant="contained">
        <ExitToAppIcon sx={{mr: 1}}></ExitToAppIcon>
        <CSVLink
          filename={"grades.csv"}
          className="btn btn-primary"
          data={props.students}
          headers={headers}
          onClick={handleExportData}
          style={{ color: "white", textDecoration: 'none' }}
        >
          Export
        </CSVLink>
      </Button>
    </>
  );
};

export default ExportGrades;

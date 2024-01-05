import { Button } from "@mui/material";
import { useState } from "react";
import { CSVLink } from "react-csv";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type Student = {
    studentId: string;
    firstName: string;
    lastName: string;
  };

type ImportGradesProps = {
  students: Student[] ;
};

const ExportGrades = (props: ImportGradesProps) => {
  const [headers, setHeaders] = useState<{ label: string; key: string }[]>([]);

  const handleExportData = () => {
    const headers: { label: string; key: string }[] = [];
    if (props.students) {
      headers.push({ label: "Id", key: "studentId" });
      headers.push({ label: "First Name", key: "firstName" });
      headers.push({ label: "Last Name", key: "lastName" });
    }

    setHeaders(headers);
  };

  return (
    <>
      <Button variant="contained">
        <ExitToAppIcon sx={{mr: 1}}></ExitToAppIcon>
        <CSVLink
          filename={"students.csv"}
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

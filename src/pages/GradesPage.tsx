import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { IGetCoursesRes } from "../types/course";
import { IUserProfileRes } from "../types/user";
import { getUserById } from "../api/user/apiUser";

import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Button, Typography } from "@mui/material";

interface Props {
  colorTheme: string;
  classEntity: IGetCoursesRes;
  teacherIds: number[];
  studentIds: number[];
  ownerId: number;
}

export default function GradesPage(props: Props) {
  const gradeTableRef = useRef(null);
  const gradeScaleTableRef = useRef(null);
  const { t } = useTranslation("global");
  const [teachers, setTeachers] = useState<IUserProfileRes[] | null>(null);
  const [students, setStudents] = useState<IUserProfileRes[] | null>(null);
  const [owner, setOwner] = useState<IUserProfileRes | null>(null);
  const [gradeScaleTable, setGradeScaleTable] = useState<Tabulator | null>(
    null
  );
  const [gradesTable, setGradesTable] = useState<Tabulator | null>(null);

  const gradeScale = [
    {
      name: "Midterm",
      scale: 0.3,
    },
    {
      name: "Final",
      scale: 0.7,
    },
  ];

  const tableData = [
    {
      studentId: "20120454",
      firstName: "Đắt",
      lastName: "Lê Công",
      midterm: 10,
      final: 10,
      average: 10,
    },
    {
      studentId: "20120455",
      firstName: "Hoa",
      lastName: "Nguyễn Thị",
      midterm: 9,
      final: 8,
      average: 8.5,
    },
    {
      studentId: "20120456",
      firstName: "Tuấn",
      lastName: "Trần Văn",
      midterm: 7,
      final: 6,
      average: 6.5,
    },
    {
      studentId: "20120457",
      firstName: "Hằng",
      lastName: "Phạm Thị",
      midterm: 5,
      final: 4,
      average: 4.5,
    },
    {
      studentId: "20120458",
      firstName: "Minh",
      lastName: "Vũ Minh",
      midterm: 8,
      final: 9,
      average: 8.5,
    },
    {
      studentId: "20120459",
      firstName: "Nam",
      lastName: "Hoàng Văn",
      midterm: 6,
      final: 7,
      average: 6.5,
    },
    {
      studentId: "20120460",
      firstName: "Thảo",
      lastName: "Đặng Thị",
      midterm: 9,
      final: 9,
      average: 9,
    },
    {
      studentId: "20120461",
      firstName: "Long",
      lastName: "Nguyễn Văn",
      midterm: 7,
      final: 8,
      average: 7.5,
    },
    {
      studentId: "20120462",
      firstName: "Linh",
      lastName: "Trần Thị",
      midterm: 8,
      final: 6,
      average: 7,
    },
    {
      studentId: "20120463",
      firstName: "Hoàng",
      lastName: "Lê Văn",
      midterm: 9,
      final: 10,
      average: 9.5,
    },
  ];

  useEffect(() => {
    let gradeTable: Tabulator;
    let gradeScaleTable: Tabulator;
    if (gradeTableRef && gradeTableRef.current) {
      // Initialize Tabulator
      gradeTable = new Tabulator(gradeTableRef.current, {
        movableRows: true,
        movableColumns: true,
        data: tableData,
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
          {
            title: "Midterm",
            field: "midterm",
            editable: true,
            editor: "number",
            sorter: "number",
          },
          {
            title: "Final",
            field: "final",
            editable: true,
            editor: "number",
            sorter: "number",
          },
          {
            title: "Average",
            field: "average",
            editable: true,
            editor: "number",
            sorter: "number",
          },
        ],
      });

      setGradesTable(gradeTable);

      //listen for row move
      gradeTable.on("rowMoved", function (row) {
        console.log("Row: " + row.getData().name + " has been moved");
      });
    }

    if (gradeScaleTableRef && gradeScaleTableRef.current) {
      // Initialize Tabulator
      gradeScaleTable = new Tabulator(gradeScaleTableRef.current, {
        movableRows: true,
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
    }

    // Cleanup when component unmounts
    return () => {
      gradeScaleTable.destroy();
      gradeTable.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserById(props.ownerId)
      .then((res) => {
        setOwner(res);
      })
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < props.teacherIds.length; i++) {
      getUserById(props.teacherIds[i])
        .then((res) => {
          setTeachers((prev) => {
            if (prev == null) return [res];
            return [...prev, res];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    for (let i = 0; i < props.studentIds.length; i++) {
      getUserById(props.studentIds[i])
        .then((res) => {
          setStudents((prev) => {
            if (prev == null) return [res];
            return [...prev, res];
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.ownerId, props.studentIds, props.teacherIds]);

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
          gap: "32px",
          alignItems: "center",
        }}
      >
        <Typography variant={"h5"} marginBottom={"16px"}>
          {t("gradeScaleTable")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "8px",
          }}
          onClick={() => {
            gradeScaleTable?.addRow({});
          }}
        >
          {t("addGradeScale")}
        </Button>
      </div>

      <div ref={gradeScaleTableRef} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          alignItems: "center",
        }}
      >
        <Typography variant={"h5"} marginY={"16px"}>
          {t("gradesTable")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "8px",
          }}
          onClick={() => {
            gradesTable?.addRow({});
          }}
        >
          {t("addStudent")}
        </Button>
      </div>

      <div ref={gradeTableRef} />
    </div>
  );
}

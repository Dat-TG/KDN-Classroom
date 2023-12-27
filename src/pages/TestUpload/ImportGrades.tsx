
import { useEffect, useRef, useState } from "react";
import {
    ColumnDefinition,
    RowComponent,
    TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Box, Button } from "@mui/material";
import GradesSelector from "./GradesSelector";

type GradeScale = {
    [key: string]: number;
};

type Student = {
    studentId: string;
    email: string;
    firstName: string;
    lastName: string;
    grades: GradeScale;
};

type GradeComponent = {
    name: string;
    scale: number;
};

function convertStudents(studentArray: Student[]): any[] {
    return studentArray.map(student => {
        const convertedStudent: any = {
            firstName: student.firstName,
            lastName: student.lastName,
            studentId: student.studentId,
            email: student.email,
        };

        for (const gradeName in student.grades) {
            if (Object.prototype.hasOwnProperty.call(student.grades, gradeName)) {
                convertedStudent[gradeName] = student.grades[gradeName];
            }
        }

        return convertedStudent;
    });
}

const ImportGrades = () => {
    const [gradeComponents, setGradeComponents] = useState<GradeComponent[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const [gradeComponentsTable, setGradeScaleTable] = useState<Tabulator | null>(null);
    const [gradesTable, setGradesTable] = useState<Tabulator | null>(null);

    const [selectedGradeScales, setSelectedGradeScale] = useState<RowComponent[]>([]);
    const [selectedStudents, setSelectedStudent] = useState<RowComponent[]>([]);



    //const [selectedStudent, setSelectedStudent] = useState<RowComponent[]>([]);

    //   const deleteSelectedRows = () =>{
    //     const newData = [...data];

    //     // Filter out selected rows
    //     const updatedData = newData.filter(student  =>  !selectedStudent.some(selectedRow => selectedRow.getData().id === student.id));

    //     // Update state with the new data
    //     setData(updatedData);

    //     // Clear selected rows
    //     setSelectedStudent([]);
    //   }

    const gradeTableRef = useRef(null);
    const gradeScaleTableRef = useRef(null);

    const handleDataFromSelector = (gradeComponents: GradeComponent[], students: Student[]) => {
        setGradeComponents(gradeComponents);
        setStudents(students);
    }

    useEffect(() => {
        console.log("Hello", convertStudents(students));
        let gradeTable: Tabulator;
        let gradeScaleTable: Tabulator;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        if (gradeTableRef && gradeTableRef.current) {
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
                    title: "Email",
                    field: "email",
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
                    title: gradeComponents[i].name,
                    field: gradeComponents[i].name,
                    editable: true,
                    editor: "number",
                    sorter: "number",
                });
            }

            gradeTable = new Tabulator(gradeTableRef.current, {
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

            setGradesTable(gradeTable);

            gradeTable.on("rowSelectionChanged", function (_data, rows) {
                //rows - array of row components for the currently selected rows in order of selection
                //data - array of data objects for the currently selected rows in order of selection
                //selected - array of row components that were selected in the last action
                //deselected - array of row components that were deselected in the last action
                setSelectedStudent(rows);
            });
        }

        if (gradeScaleTableRef && gradeScaleTableRef.current) {
            // Initialize Tabulator
            gradeScaleTable = new Tabulator(gradeScaleTableRef.current, {
                movableRows: true,
                history: true,
                movableColumns: true,
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

            gradeScaleTable.on("rowSelectionChanged", function (_data, rows) {
                //rows - array of row components for the currently selected rows in order of selection
                //data - array of data objects for the currently selected rows in order of selection
                //selected - array of row components that were selected in the last action
                //deselected - array of row components that were deselected in the last action
                setSelectedGradeScale(rows);
            });

        }

        // Cleanup when component unmounts
        return () => {
            gradeScaleTable.destroy();
            gradeTable.destroy();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradeComponents, students]);

    const deleteSelectedGradeScales = () => {

        if (!selectedGradeScales) {
            return;
        }

        setGradeComponents((prevGradeComponents) =>
            prevGradeComponents.filter((gradeScale) =>
                !selectedGradeScales.some((selected) => selected.getData().name === gradeScale.name)
            )
        );


        // Clear selected rows
        setSelectedStudent([]);

    }

    const deleteSelectedStudents = () => {

        if (!selectedStudents) {
            return;
        }

        setStudents((prevStudents) =>
            prevStudents.filter((student) =>
                !selectedStudents.some((selected) => selected.getData().studentId === student.studentId)
            )
        );


        // Clear selected rows
        setSelectedStudent([]);

    }

    return (
        <div>
            <GradesSelector onChange={(gradeComponents, students) => handleDataFromSelector(gradeComponents, students)} />

            <div>
                <Box ref={gradeScaleTableRef} className="p-2" sx={{ height: 'auto', width: 'auto' }} >
                </Box>
            </div>

            <div>
                <Box ref={gradeTableRef} className="p-2" sx={{ height: 'auto', width: 'auto' }} >
                </Box>
            </div>


            {/* <button onClick={deleteSelectedRows}>Delete Selected Rows</button> */}

            <Button variant="contained" onClick={deleteSelectedGradeScales}>Delete grade scale</Button>
            <Button variant="outlined" onClick={deleteSelectedStudents}>Delete Students</Button>
        </div>
    );
};

export default ImportGrades;

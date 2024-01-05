
import { useEffect, useRef, useState } from "react";
import {
    ColumnDefinition,
    RowComponent,
    TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import GradesSelector from "./GradesSelector";
import { useTranslation } from "react-i18next";
import ExportGrades from "./ExportGradesCSV";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertStudents(studentArray: Student[]): any[] {
    return studentArray.map(student => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// type ImportGradesProps = {
//     handleImport(students : Student[]): void;
// };

const ImportGrades = () => {
    const { t } = useTranslation("global");
    const [gradeComponents, setGradeComponents] = useState<GradeComponent[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

    const [selectedGradeScales, setSelectedGradeScales] = useState<RowComponent[]>([]);
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

    const handleDataFromSelector = (gradeComponents: GradeComponent[], students: Student[]) => {
        setGradeComponents(gradeComponents);
        setStudents(students);
    }

    const ConfirmImport = () => {
        if (students && students.length > 0) {
            console.log(students);
        }

        // Handle import data here
        setIsDialogShowed(false);
    }

    useEffect(() => {
        if (students.length > 0 && gradeComponents.length > 0) {
            ShowDialog();
        }
    }, [gradeComponents, students]);


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        if (gradeTableRef && gradeTableRef.current && gradeScaleTableRef && gradeScaleTableRef.current != null
            && students.length > 0 && gradeComponents.length > 0) {
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

            const newGradeComponents = prevGradeComponents.filter((gradeScale) =>
                !selectedGradeScales.some((selected) => selected.getData().name === gradeScale.name)
            );

            return newGradeComponents;
        }

        );

        // Clear selected rows
        setSelectedGradeScales([]);
    }

    const deleteSelectedStudents = () => {

        if (!selectedStudents) {
            return;
        }

        setStudents((prevStudents) => {
            if (!prevStudents) {
                return prevStudents;
            }
            const newStudents = prevStudents.filter((student) =>
                !selectedStudents.some((selected) => selected.getData().studentId === student.studentId)
            );
            return newStudents;
        }

        );


        // Clear selected rows
        setSelectedStudent([]);

    }

    return (
        <div>
            <GradesSelector onChange={(gradeComponents, students) => handleDataFromSelector(gradeComponents, students)} />

            <Dialog
                sx={{ display: isDialogShowed ? 'block' : 'none', width: '100%', height: 'auto' }}
                open={true}
                onClose={HideDialog}
                maxWidth= "md"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {t("importConfirmation")}
                </DialogTitle>
                <DialogContent sx={{ p: 0, ml: '24px', mr: '24px' }}>

                    <Box sx={{ minHeight: '38px', display: 'flex', alignItems: 'flex-end' }} >
                        <Typography variant="h6" sx={{ mr: 1, mb: 0 }} gutterBottom>
                            {t("gradeComponents")}
                        </Typography>
                        {(selectedGradeScales.length > 0) && (
                            <Button variant="outlined" onClick={deleteSelectedGradeScales} sx={{ pr: '3px', pl: '3px', pt: 0, pb: 0 }}>
                                {selectedGradeScales.length >= 2
                                    ? `Delete ${selectedGradeScales.length} records`
                                    : `Delete ${selectedGradeScales.length} record`
                                }
                            </Button>)
                        }
                    </Box>

                    <Box ref={gradeScaleTableRef} sx={{ mt: 1, height: 'auto', width: 'auto' }} >
                    </Box>

                    <Box sx={{ minHeight: '38px', mt: 1, display: 'flex', alignItems: 'flex-end' }} >
                        <Typography variant="h6" sx={{ mr: 1, mb: 0 }} gutterBottom>
                            {t("grades")}
                        </Typography>
                        {(selectedStudents.length > 0) && (
                            <Button variant="outlined" onClick={deleteSelectedStudents} sx={{ pr: '3px', pl: '3px', pt: 0, pb: 0 }}>
                                {selectedStudents.length >= 2
                                    ? `Delete ${selectedStudents.length} records`
                                    : `Delete ${selectedStudents.length} record`
                                }
                            </Button>)
                        }
                    </Box>

                    <Box ref={gradeTableRef} sx={{ mt: 1, mb: 1, height: 'auto', width: 'auto' }} >
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={HideDialog}> {t("cancel")}</Button>
                    <Button onClick={ConfirmImport}>
                        {t("import")}
                    </Button>
                </DialogActions>
            </Dialog>

            <ExportGrades students={students} gradeComponents={gradeComponents}/>
        </div>
    );
};

export default ImportGrades;

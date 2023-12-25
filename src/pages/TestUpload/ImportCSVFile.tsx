
import { useEffect, useRef, useState } from "react";
import CSVSelector from "./CSVSelector";


import {
  ColumnDefinition,
  RowComponent,
  TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { Box } from "@mui/material";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
}

const ImportCSVFile = () => {
  const [data, setData] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<RowComponent[]>([]);

  const deleteSelectedRows = () =>{
    const newData = [...data];

    // Filter out selected rows
    const updatedData = newData.filter(student  =>  !selectedStudent.some(selectedRow => selectedRow.getData().id === student.id));

    // Update state with the new data
    setData(updatedData);

    // Clear selected rows
    setSelectedStudent([]);
  }

  const previewTableRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && previewTableRef.current) {

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const columnDefinitions: ColumnDefinition[] = [
        {title:"", formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign: "center",  headerHozAlign: "center", headerSort:false, width: 40},
        { title: "Id", field: "id", width: 120 },
        { title: "First Name", field: "firstName", width: 180 },
        { title: "Last Name", field: "lastName", width: 220 },
      ];

      const table = new Tabulator(previewTableRef.current, {
        height: 205,
        data: data,
        layout: "fitDataTable",
        selectable: true,
        columns: columnDefinitions,
      });

      table.on("rowSelectionChanged", function (_data, rows) {
        setSelectedStudent(rows);
      });

      // Optional: If you want to perform any cleanup when the component is unmounted
      return () => {
        table.destroy();
      };
    }

  }, [data])

  return (
    <div>
      <CSVSelector onChange={(_data) => setData(_data)} />

      {data.length > 0 &&
        (<Box ref={previewTableRef} className="p-2" sx={{ height: 'auto', width: 'auto'}} >
        </Box>)
      }

      <button onClick={deleteSelectedRows}>Delete Selected Rows</button>

    </div>
  );
};

export default ImportCSVFile;

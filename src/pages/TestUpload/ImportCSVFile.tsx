
import { useEffect, useRef, useState } from "react";
import CSVSelector from "./CSVSelector";
import {
  ColumnDefinition,
  RowComponent,
  TabulatorFull as Tabulator,
} from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

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

  // const columns = [
  //   {
  //     header: 'ID',
  //     accessorKey: 'id'
  //   },
  //   {
  //     header: 'First Name',
  //     accessorKey: 'firstName'
  //   },
  //   {
  //     header: 'Last Name',
  //     accessorKey: 'lastName'
  //   },
  // ];
  useEffect(() => {
    if (data.length > 0 && previewTableRef.current) {
      //console.log(data);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const columnDefinitions: ColumnDefinition[] = [
        {title:"", formatter:"rowSelection", titleFormatter:"rowSelection", headerSort:false},
        { title: "Id", field: "id", width: 150 },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
      ];

      const table = new Tabulator(previewTableRef.current, {
        height: 205,
        data: data,
        layout: "fitColumns",
        selectable: true,
        columns: columnDefinitions,
      });

      table.on("rowSelectionChanged", function (_data, rows) {
        //rows - array of row components for the currently selected rows in order of selection
        //data - array of data objects for the currently selected rows in order of selection
        //selected - array of row components that were selected in the last action
        //deselected - array of row components that were deselected in the last action
        setSelectedStudent(rows);
      });


      // Optional: If you want to perform any cleanup when the component is unmounted
      return () => {
        table.destroy();
      };
    }

  }, [data])
  // let previewTable: Tabulator;

  // previewTable = new Tabulator(previewTableRef.current, {
  //   height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  //   data: data, //assign data to table
  //   layout: "fitColumns", //fit columns to width of table (optional)
  //   columns: [ //Define Table Columns
  //     { title: "Name", field: "name", width: 150 },
  //     { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
  //     { title: "Favourite Color", field: "col" },
  //     { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
  //   ],
  // });





  // const columnHelper = createColumnHelper<Student>()

  // const columns = [
  //   columnHelper.accessor('id', {
  //     header: 'ID',
  //     cell: info => info.getValue(),
  //   }),
  //   columnHelper.accessor('firstName', {
  //     header: 'First Name',
  //     cell: info => info.getValue(),
  //   }),
  //   columnHelper.accessor('lastName', {
  //     header: 'Last Name',
  //     cell: info => info.getValue(),
  //   }),
  // ]

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })

  return (
    <div>
      <CSVSelector onChange={(_data) => setData(_data)} />

      {data.length > 0 &&
        (<div ref={previewTableRef} className="p-2">
        </div>)
      }

      <button onClick={deleteSelectedRows}>Delete Selected Rows</button>

    </div>
  );
};

export default ImportCSVFile;

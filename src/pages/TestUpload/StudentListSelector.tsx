import React from "react";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import toast from "../../utils/toast";
import { useTranslation } from "react-i18next";
import readXlsxFile from "read-excel-file";

type Props = {
  onChange(data: Student[]): void;
};

type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

const StudentListSelector = ({ onChange }: Props) => {
  const { t } = useTranslation("global");

  const handleRawData = (rawData: string[][]): void => {
    if (rawData.length > 0) {
      console.log("Hello");
      if (
        rawData[0][0] != "studentId" ||
        rawData[0][1] != "firstName" ||
        rawData[0][2] != "lastName"
      ) {
        toast.error(t("wrongFormatCSV"));
      } else {
        const result: Student[] = [];
        rawData.map((item, index) => {
          if (index > 0 && item.length === 3) {
            const student: Student = {
              id: item[0],
              firstName: item[1],
              lastName: item[2],
            };

            result.push(student);
          }
        });
        // 6. call the onChange event
        onChange(result);
      }
    }
  }; 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];

        console.log(file.type);

        if (
          file &&
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          readXlsxFile(file).then((rows) => {
            console.log("rows: ",rows);
            const data: string[][] = [];
            rows.map((row) => {
              const rowArray: string[] = [];
              row.map((cell) => {
                rowArray.push(cell.toString());
              });
              data.push(rowArray);
            });

            console.log("raw data: ",data);
            handleRawData(data);
       
          });

        } else if (file.type == "text/csv") {
          Papa.parse(file, {
            complete: (result: Papa.ParseResult<string[]>) => {
              //result.data contains the parsed CSV data
              const data = result.data;
              handleRawData(data);
            },
            header: false, // Set to true if your CSV has a header row
          });
        } else {
          toast.error(t("onlyAcceptCSV"));
        }

        
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button variant="contained" component="label">
        Import CSV
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

export default StudentListSelector;

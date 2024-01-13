import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ExcelJS from "exceljs";
import { useTranslation } from "react-i18next";
import { FileDownload } from "@mui/icons-material";

//  Excel data
const excelData = [["studentId", "firstName", "lastName"]];

interface Props {
  colorTheme?: string;
}

const DownloadTemplateImportStudent = ({ colorTheme }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation("global");
  const downloadCSV = () => {
    // Convert data to CSV format
    const csvContent = excelData.map((row) => row.join(",")).join("\n");

    // Create a Blob object
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "student_list_template.csv";
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadXLSX = async () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add data to the worksheet
    excelData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate a buffer from the workbook
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "student_list_template.xlsx";
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleDownloadClick}
        startIcon={<FileDownload />}
        sx={{
          color: colorTheme,
        }}
      >
        {t("downloadStudentListTemplate")}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            downloadCSV();
            handleClose();
          }}
        >
          {t("download")} CSV
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadXLSX();
            handleClose();
          }}
        >
          {t("download")} XLSX
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DownloadTemplateImportStudent;

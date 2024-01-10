import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FileDownload } from "@mui/icons-material";

interface IDownloadTabulatorButtonProps {
  colorTheme?: string;
  onDownloadCSV: () => void;
  onDownloadXLSX: () => void;
}

const DownloadTabulatorButton = ({
  colorTheme,
  onDownloadCSV,
  onDownloadXLSX,
}: IDownloadTabulatorButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation("global");

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
        sx={{
          color: colorTheme,
        }}
        startIcon={
          <FileDownload
            sx={{
              color: colorTheme,
            }}
          />
        }
      >
        {t("download")}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onDownloadCSV();
            handleClose();
          }}
        >
          {t("download")} CSV
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDownloadXLSX();
            handleClose();
          }}
        >
          {t("download")} XLSX
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DownloadTabulatorButton;

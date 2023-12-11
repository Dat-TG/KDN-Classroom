import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ClassInfoForm from "./ClassInfoForm";
import { useRef, useState } from "react";
import ClassScoreForm from "./ClassScoreForm";
import { ICourse } from "../../types/course";

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string;
  inviteLink: string;
  colorTheme: string;
  name: string;
  section: string;
}
export default function ClassSettingsDialog(props: Props) {
  const infoFormSubmitRef = useRef<HTMLButtonElement>(null);

  const classEntity = {} as ICourse;

  const Save = () => {
    infoFormSubmitRef?.current?.click();
    console.log(classEntity);
  };

  const { t } = useTranslation("global");

  const [isLoading /*setIsLoading*/] = useState(false);
  return (
    <>
      <Dialog
        open={props.open}
        fullScreen
        maxWidth={"md"}
        onClose={() => {
          props.onClose();
        }}
      >
        <DialogTitle display={"flex"} justifyContent={"space-between"}>
          <Box display={"flex"}>
            <Tooltip title={t("close")} sx={{ mr: 1 }}>
              <IconButton
                onClick={() => {
                  props.onClose();
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
            <Box display={"flex"} alignItems={"center"}>
              <Typography> {t("classSettings")}</Typography>
            </Box>
          </Box>

          <Button variant="contained" onClick={Save}>
            {isLoading ? (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            ) : (
              t("save")
            )}
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 3,
              // boxShadow: 24,
              border: "solid 1px",
              borderColor: "darkGray",
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{ mb: 1 }}
            >
              {t("createClass")}
            </Typography>
            <ClassInfoForm
              submitRef={infoFormSubmitRef}
              classEntity={classEntity}
              hiddenSubmit={true}
            />
          </Box>

          <Box
            sx={{
              width: 600,
              bgcolor: "background.paper",
              borderRadius: 3,
              border: "solid 1px",
              borderColor: "darkGray",
              p: 4,
              mt: 2,
            }}
          >
            <ClassScoreForm
              submitRef={infoFormSubmitRef}
              classEntity={classEntity}
            />
          </Box>

          {/* <Button variant="contained" onClick={showEntity}>
                        show
                    </Button> */}
        </DialogContent>
      </Dialog>
    </>
  );
}

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import ClassInfoForm from "./class_details/ClassInfoForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitRef?: React.RefObject<HTMLButtonElement> | React.MutableRefObject<HTMLButtonElement>;
}

const CreateClassModal: React.FC<Props> = (props) => {

  const [isLoading /*setIsLoading*/] = useState(false);

  const infoFormSubmitRef = useRef<HTMLButtonElement>(null);

  const [t] = useTranslation("global");

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("createClass")}
        </Typography>
        <ClassInfoForm submitRef={infoFormSubmitRef} />

        <Box sx={{ display: "flex", mt: 2 }}>
          <Button
            variant="text"
            size="large"
            sx={{ ml: "auto", mr: 1.5, color: "grey" }}
            onClick={props.onClose}
          >
            <Typography
              sx={{
                fontWeight: "500",
              }}
            >
              {" "}
              {t("cancel")}
            </Typography>
          </Button>
          <Button
            ref={props.submitRef}
            type="submit"
            variant="text"
            color="primary"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={30} style={{ color: "white" }} />
            ) : (
              <Typography
                sx={{
                  fontWeight: "500",
                }}
              >
                {t("create")}
              </Typography>
            )}
          </Button>
        </Box>


      </Box>
    </Modal>
  );
}

export default CreateClassModal;

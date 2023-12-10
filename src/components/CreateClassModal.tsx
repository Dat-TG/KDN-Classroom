import { Box, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import ClassInfoForm from "./class_details/ClassInfoForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitRef?:
    | React.RefObject<HTMLButtonElement>
    | React.MutableRefObject<HTMLButtonElement>;
}

const CreateClassModal: React.FC<Props> = (props) => {
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
        <ClassInfoForm
          submitRef={infoFormSubmitRef}
          onDialogClose={props.onClose}
        />
      </Box>
    </Modal>
  );
};

export default CreateClassModal;

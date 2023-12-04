import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close, RotateLeft, RotateRight } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getUserProfile, updateAvatar } from "../store/user/thunkApi";
// import { useUser } from "../hooks/useUser";

function AvatarEditorComponent({
  callback,
}: {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [image, setImage] = useState("");
  const editorRef = useRef<AvatarEditor | null>(null);

  const [scale, setScale] = useState(0);
  const [rotate, setRotate] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setIsOpen(true);
      e.target.value = "";
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSaveAvatar = () => {
    callback(true);
    //const canvas = editorRef.current?.getImage();

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = editorRef.current?.getImageScaledToCanvas();

    canvasScaled?.toBlob(async (blob) => {
      const file = new File([blob!], "editedImage.png", { type: "image/png" });
      console.log("upload ", file);
      await dispatch(updateAvatar(file));
      callback(false);
      await dispatch(getUserProfile());
    }, "image/png");
    setIsOpen(false);
  };

  const inputStyle = {
    display: "none",
  };

  const { t } = useTranslation("global");

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="avatar-input">
          <Typography variant="h6">{t("profilePicture")}</Typography>
          <Typography sx={{ color: "gray" }} variant="body2">
            PNG, JPG {t("upTo")} 5MB
          </Typography>
          <Button
            component="span"
            TouchRippleProps={{ center: true }}
            size="medium"
            sx={{
              textTransform: "none",
              mt: 1,
            }}
            variant="outlined"
          >
            <Typography sx={{}} variant="body1">
              {t("changeAvatar")}
            </Typography>
          </Button>
        </label>
        <input
          accept="image/*"
          id="avatar-input"
          type="file"
          style={inputStyle}
          onChange={handleImageChange}
        />
      </Box>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6">{t("changeAvatar")}</Typography>
            <IconButton
              size="small"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Close sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {image && (
            <AvatarEditor
              ref={(ref: AvatarEditor) => (editorRef.current = ref)}
              image={image}
              width={400}
              height={400}
              border={50}
              color={[255, 255, 255, 0.6]}
              scale={1 + scale / 100}
              rotate={rotate}
              borderRadius={9999}
            />
          )}
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            justifyContent={"center"}
          >
            <IconButton
              size="small"
              onClick={() => setRotate((rotate - 90) % 360)}
            >
              <RotateLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setRotate((rotate + 90) % 360)}
            >
              <RotateRight />
            </IconButton>
          </Stack>
          <Box display={"flex"} justifyContent={"center"}>
            <input
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="200"
              value={scale}
              onChange={(event) => {
                setScale(parseInt(event.target.value));
              }}
              className="w-full"
            ></input>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSaveAvatar}
          >
            {t("setNewProfilePicture")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AvatarEditorComponent;

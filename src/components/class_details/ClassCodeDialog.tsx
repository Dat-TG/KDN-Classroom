import {
  Close,
  ContentCopy,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "../../utils/toast";

interface Props {
  open: boolean;
  onClose: () => void;
  classId: string;
  colorTheme: string;
  name: string;
  section: string;
  inviteLink: string;
}
export default function ClassCodeDialog(props: Props) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const { t } = useTranslation("global");
  return (
    <>
      <Dialog
        open={props.open}
        fullWidth
        maxWidth={"md"}
        fullScreen={isFullScreen}
        onClose={() => {
          props.onClose();
          setIsFullScreen(false);
        }}
      >
        <DialogTitle
          justifyContent={isFullScreen ? "flex-start" : "flex-end"}
          display={"flex"}
        >
          <Tooltip title={t("close")}>
            <IconButton
              onClick={() => {
                props.onClose();
                setIsFullScreen(false);
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: isFullScreen ? "100vh" : "none",
          }}
        >
          <Typography
            align="center"
            sx={{
              fontSize: isFullScreen ? "256px" : "128px",
              fontWeight: "400",
              color: props.colorTheme,
              lineHeight: "1",
            }}
          >
            {props.classId}
          </Typography>
          <Divider
            sx={{
              marginY: "14px",
              borderWidth: "1px",
              background: props.colorTheme,
              width: "100%",
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Box display={"flex"} gap={"16px"}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  color: props.colorTheme,
                }}
              >
                {props.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: props.colorTheme,
                }}
              >
                {props.section}
              </Typography>
            </Box>
            <Box display={"flex"} gap={"8px"}>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(props.inviteLink);
                  toast.simple(t("copiedToClipboard"));
                }}
              >
                <ContentCopy
                  sx={{
                    color: props.colorTheme,
                  }}
                />
                <Typography
                  sx={{
                    marginLeft: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: props.colorTheme,
                  }}
                >
                  {t("copyInviteLink")}
                </Typography>
              </Button>

              <IconButton
                onClick={() => {
                  setIsFullScreen(!isFullScreen);
                }}
              >
                {isFullScreen ? (
                  <FullscreenExitOutlined
                    sx={{
                      color: props.colorTheme,
                    }}
                  />
                ) : (
                  <FullscreenOutlined
                    sx={{
                      color: props.colorTheme,
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

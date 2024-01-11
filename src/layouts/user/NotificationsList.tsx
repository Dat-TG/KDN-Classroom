import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import CircleIcon from "@mui/icons-material/Circle";

const NotificationsList: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const notificationText: string[] = [
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
    " Nguyen Huy khanh moi ban vao lớp PTUDW Nguyen Huy khanh moi ban vao lớp",
  ];

  const viewNotification = () => {
    console.log("viewNotification");
  }
  

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [t] = useTranslation("global");

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: "40px",
          height: "40px", // Set button size
        }}
        color="inherit"
      >
        <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}

      >
        <Box>
          <Typography variant="h6" sx={{ml: 2}}> Thông báo</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button variant="text" sx={{ ml: 1 }}>
            {t("markAllAsRead")}
          </Button>
          <Button variant="text" sx={{ mr: 1 }}>
            {t("seeAll")}
          </Button>
        </Box>
        <Box sx={{ maxHeight: "500px", overflowY: 'scroll' }}>
          {notificationText.map((text, index) => (
            <MenuItem
              key={index}
              sx={{
                width: "300px",
                display: "flex",
                borderBottom: 'solid 1px darkGray'
              }}
              onClick={viewNotification}
            >
              <Box sx={{ display: "flex"}}>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "normal",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    maxHeight: "4rem",
                    WebkitLineClamp: 2,
                  }}
                >
                  {text}
                </Typography>

                <Box
                  sx={{
                    width: "25px",
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CircleIcon sx={{ fontSize: "small", color: "primary" }} />
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </div>
  );
};

export default NotificationsList;

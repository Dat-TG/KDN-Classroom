import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { Assignment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ClassEntity } from "../../pages/ClassDetailsPage";

const CourseCard = (props: { classEntity: ClassEntity }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginTop: "35px" }}
    >
      <MenuItem>Move</MenuItem>
      <MenuItem>Leave</MenuItem>
    </Menu>
  );
  return (
    <Card
      sx={{
        width: 290,
        height: 330,
        position: "relative",
        borderRadius: 3,
        "&:hover": {
          transform: "scale(1.005)",
          transition: "0.1s",
          boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
        },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image={props.classEntity.backgroundImage}
          alt="Paella dish"
          sx={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      </Box>

      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <CardHeader
          avatar={
            <Box sx={{ pt: 1 }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                K
              </Avatar>
            </Box>
          }
          action={
            <IconButton
              aria-label="settings"
              sx={{ color: "white" }}
              onClick={handleProfileMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography
              sx={{
                pt: 1,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
              variant="h6"
              onClick={() => {
                navigate(`/class/${props.classEntity.id}`);
              }}
            >
              {props.classEntity.name}
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: 13 }} component="p">
              {props.classEntity.subject}
            </Typography>
          }
          sx={{
            color: "white",
            zIndex: 1,
            height: 120,
            alignItems: "center",
          }}
        />

        <CardContent
          sx={{ zIndex: 1, height: 145, overflow: "hidden" }}
        ></CardContent>
        <Divider />
        <CardActions
          disableSpacing
          sx={{ zIndex: 1, display: "flex", justifyContent: "end" }}
        >
          <Tooltip title="Assignments">
            <IconButton sx={{ mr: 1 }}>
              <Assignment />
            </IconButton>
          </Tooltip>
          <Tooltip title="Like">
            <IconButton aria-label="share" sx={{ mr: 1 }}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
      {renderMenu}
    </Card>
  );
};

export default CourseCard;

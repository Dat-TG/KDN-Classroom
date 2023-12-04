import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import LanguageMenu from "../user/LanguageMenu";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import { Edit } from "@mui/icons-material";
import { Divider } from "@mui/material";

interface Props {
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const PrimaryAppbar: React.FC<Props> = (props: Props) => {
  const ChangeToggleSidebar = () => {
    props.toggleSidebar();
  };

  const [t] = useTranslation("global");

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    setAnchorEl(null);
  }, [props.isLoggedIn]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector(sGetUserInfo);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ marginTop: "40px" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box
        sx={{
          mr: 5,
          ml: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="avatar-input">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={() => navigate("/profile")}
            color="inherit"
            sx={{
              mb: 2,
              position: "relative",
              "&:hover": {
                backgroundColor: "transparent",

                "& .edit-icon": {
                  color: "darkblue",
                  backgroundColor: "#E7E9EB",
                },
              },
            }}
          >
            <Avatar
              className="avatar"
              alt={`${user?.name} ${user?.surname}`}
              src={user?.avatar}
              sx={{
                border: "2px solid white",

                width: "100px",
                height: "100px",
              }}
            />
            <IconButton
              className="edit-icon"
              size="small"
              sx={{
                position: "absolute",
                bottom: 3,
                right: 2,
                backgroundColor: "white",
                transition: "background-color 0.3s",
              }}
            >
              <Edit />
            </IconButton>
          </IconButton>
        </label>
        <Typography variant="h5" sx={{ color: "black" }}>
          {`${user?.name} ${user?.surname}`}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mt: 1, mb: 2 }}>
          {user?.emailAddress}
        </Typography>
      </Box>

      <Divider sx={{ margin: 2 }} />

      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          navigate("/");
        }}
      >
        {t("home")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          navigate("/profile");
        }}
      >
        {t("profile")}
      </MenuItem>
      <MenuItem onClick={props.onLogout}>{t("logOut")}</MenuItem>
    </Menu>
  );

  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = React.useState("");

  React.useEffect(() => {
    switch (location.pathname) {
      case "/admin/users":
        setBreadcrumb(t("users"));
        break;
      case "/admin/classes":
        setBreadcrumb(t("classes"));
        break;
      case "/admin/settings":
        setBreadcrumb(t("settings"));
        break;
      default:
        setBreadcrumb("");
        break;
    }
  }, [location.pathname, t]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {props.isLoggedIn && (
        <>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={ChangeToggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
              >
                {t("classroomAdmin")}
                {breadcrumb && `   >   ${breadcrumb}`}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  },
                }}
              >
                <IconButton
                  sx={{
                    width: "40px",
                    height: "40px", // Set button size
                  }}
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <LanguageMenu />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={`${user?.name} ${user?.surname}`}
                    src={user?.avatar}
                    style={{
                      border: "2px solid white",
                    }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMenu}
        </>
      )}
    </Box>
  );
};

export default PrimaryAppbar;

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
import { Link, useLocation, useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import ActionMenu from "./ActionMenu";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

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

  //const { user } = React.useContext(AuthContext);

  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = React.useState("");

  React.useEffect(() => {
    switch (location.pathname) {
      case "/calendar":
        setBreadcrumb(t("calendar"));
        break;
      case "/todo":
        setBreadcrumb(t("todo"));
        break;
      case "/archived":
        setBreadcrumb(t("archivedClasses"));
        break;
      case "/settings":
        setBreadcrumb(t("settings"));
        break;
      default:
        setBreadcrumb("");
        break;
    }
  }, [location.pathname, t]);

  const user = useSelector(sGetUserInfo);

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
                  navigate("/");
                }}
              >
                {t("classroomUppercase")}
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
                <ActionMenu />
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

      {!props.isLoggedIn && (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
                onClick={() => {
                  navigate("/landing");
                }}
              >
                {t("classroomUppercase")}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <div style={{ marginRight: "16px" }}>
                <LanguageMenu />
              </div>

              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "16px",
                }}
              >
                {t("register")}
              </Link>

              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "2px",
                }}
              >
                {t("login")}
              </Link>
            </Toolbar>
          </AppBar>
        </>
      )}
    </Box>
  );
};

export default PrimaryAppbar;

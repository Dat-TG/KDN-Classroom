import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import {
  Dashboard,
  ManageAccounts,
  School,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const drawerWidth = 300;

interface Props {
  open: boolean;
}

class MenuOption {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;

  constructor({
    name,
    icon,
    onClick,
  }: {
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }) {
    this.name = name;
    this.icon = icon;
    this.onClick = onClick;
  }
}

const MiniDrawer: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [t] = useTranslation("global");

  React.useEffect(() => {
    switch (location.pathname) {
      case "/admin/dashboard":
        setSelectedIndex(0);
        break;
      case "/admin/classes":
        setSelectedIndex(1);
        break;
      case "/admin/users":
        setSelectedIndex(2);
        break;
      case "/admin/settings":
        setSelectedIndex(3);
        break;
      default:
        setSelectedIndex(-1);
        break;
    }
  }, [location]);

  const menuOptions1: MenuOption[] = [
    new MenuOption({
      name: t("dashboard"),
      icon: <Dashboard />,
      onClick: () => {
        navigate("/admin/dashboard");
      },
    }),
    new MenuOption({
      name: t("classes"),
      icon: <School />,
      onClick: () => {
        navigate("/admin/classes");
      },
    }),
    new MenuOption({
      name: t("users"),
      icon: <ManageAccounts />,
      onClick: () => {
        navigate("/admin/users");
      },
    }),
  ];

  const menuOptions2: MenuOption[] = [
    new MenuOption({
      name: t("settings"),
      icon: <Settings />,
      onClick: () => {
        navigate("/admin/settings");
      },
    }),
  ];

  function MenuOptionItem({
    item,
    index,
    canExpanded,
  }: {
    item: MenuOption;
    index: number;
    canExpanded?: boolean;
  }) {
    return (
      <ListItem
        disablePadding
        sx={{
          display: "block",
          backgroundColor:
            index === selectedIndex ? "secondary.light" : "transparent",
          color: "default",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent:
              props.open || (!props.open && isHovered) ? "initial" : "center",
            whiteSpace: "nowrap",
            pl: canExpanded ? 0 : 4,
            pr: 2.5,
          }}
          onClick={() => {
            if (!canExpanded) setSelectedIndex(index);
            item.onClick();
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.open || (!props.open && isHovered) ? 3 : "auto",
              justifyContent: "center",
              color: "default",
            }}
          >
            {item.icon}
          </ListItemIcon>
          {(props.open || (!props.open && isHovered)) && (
            <ListItemText primary={item.name} />
          )}
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: (theme) => theme.palette.divider,
        overflowX: "hidden",
        width:
          props.open || (!props.open && isHovered)
            ? `${drawerWidth}px`
            : "72px",
        transition: "width 0.2s, padding 0.3s",
        marginTop: "64px",
        height: "calc(100vh - 64px)",
      }}
    >
      <CssBaseline />
      <div>
        <List>
          {menuOptions1.map((item, index) => (
            <MenuOptionItem item={item} index={index} key={item.name} />
          ))}
        </List>
        <Divider />
        <List>
          {menuOptions2.map((item, index) => (
            <MenuOptionItem
              item={item}
              index={index + menuOptions1.length}
              key={item.name}
            />
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;

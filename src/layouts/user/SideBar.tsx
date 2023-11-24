import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Divider } from "@mui/material";
import {
  CalendarMonth,
  Drafts,
  Email,
  Home,
  School,
} from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

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

  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/calendar":
        setSelectedIndex(1);
        break;
      case "/school":
        setSelectedIndex(2);
        break;
      case "/inbox":
        setSelectedIndex(3);
        break;
      case "/sendemail":
        setSelectedIndex(4);
        break;
      case "/drafts":
        setSelectedIndex(5);
        break;
      default:
        setSelectedIndex(-1);
        break;
    }
  }, [location]);

  const menuOptions: MenuOption[] = [
    new MenuOption({
      name: "Home",
      icon: <Home />,
      onClick: () => {
        navigate("/");
      },
    }),
    new MenuOption({
      name: "Calendar",
      icon: <CalendarMonth />,
      onClick: () => {},
    }),
    new MenuOption({ name: "School", icon: <School />, onClick: () => {} }),
    new MenuOption({ name: "Inbox", icon: <InboxIcon />, onClick: () => {} }),
    new MenuOption({ name: "Send email", icon: <Email />, onClick: () => {} }),
    new MenuOption({ name: "Drafts", icon: <Drafts />, onClick: () => {} }),
  ];

  function MenuOptionItem({
    item,
    index,
  }: {
    item: MenuOption;
    index: number;
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
            px: 2.5,
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            setSelectedIndex(index);
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
      }}
    >
      <CssBaseline />
      <div>
        <List>
          {menuOptions.slice(0, 2).map((item, index) => (
            <MenuOptionItem item={item} index={index} key={item.name} />
          ))}
        </List>
        <Divider />
        <List>
          {menuOptions.slice(2).map((item, index) => (
            <MenuOptionItem item={item} index={index + 2} key={item.name} />
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Avatar, Divider, Typography } from "@mui/material";
import {
  Archive,
  ArrowDropDown,
  ArrowRight,
  CalendarMonth,
  Home,
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

class Course {
  name: string;
  topic?: string;

  slug?: string;

  constructor({
    name,
    topic,
    slug,
  }: {
    name: string;
    topic?: string;
    slug?: string;
  }) {
    this.name = name;
    this.topic = topic;
    this.slug = slug;
  }
}

const MiniDrawer: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [t] = useTranslation("global");

  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/calendar":
        setSelectedIndex(1);
        break;
      case "/todo":
        setSelectedIndex(2);
        break;
      case "/archived":
        setSelectedIndex(3);
        break;
      case "/settings":
        setSelectedIndex(4);
        break;

      default:
        setSelectedIndex(-1);
        break;
    }
  }, [location]);

  const menuOptions1: MenuOption[] = [
    new MenuOption({
      name: t("home"),
      icon: <Home />,
      onClick: () => {
        navigate("/");
      },
    }),
    new MenuOption({
      name: t("calendar"),
      icon: <CalendarMonth />,
      onClick: () => {
        navigate("/calendar");
      },
    }),
  ];
  const enrolledOption = new MenuOption({
    name: t("enrolled"),
    icon: <School />,
    onClick: () => {
      setIsExpanded(!isExpanded);
    },
  });
  const expanedMenuOptions: MenuOption[] = [
    new MenuOption({
      name: t("todo"),
      icon: <InboxIcon />,
      onClick: () => {
        navigate("/todo");
      },
    }),
  ];
  const menuOptions2: MenuOption[] = [
    new MenuOption({
      name: t("archivedClasses"),
      icon: <Archive />,
      onClick: () => {
        navigate("/archived");
      },
    }),
    new MenuOption({
      name: t("settings"),
      icon: <Settings />,
      onClick: () => {
        navigate("/settings");
      },
    }),
  ];

  const listCourses = [
    new Course({
      name: "2309-PTUDWNC-20_3",
      topic: "Phát triển ứng dụng web nâng cao",
      slug: "PTUDWNC",
    }),
    new Course({
      name: "Vi tích phân 1B (HK1, 2020-2021)",
      slug: "VTP1B",
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
          {canExpanded && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 1,
                justifyContent: "center",
                color: "default",
              }}
            >
              {isExpanded ? <ArrowDropDown /> : <ArrowRight />}
            </ListItemIcon>
          )}
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

  function CourseItem({ item, index }: { item: Course; index: number }) {
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
            pl: 4,
            pr: 2.5,
          }}
          onClick={() => {
            setSelectedIndex(index);
            navigate(`/course/${item.slug}`);
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
            <Avatar
              sx={{
                width: "30px",
                height: "30px",
                backgroundColor: "primary.main",
              }}
            >
              {item.name[0]}
            </Avatar>
          </ListItemIcon>
          {(props.open || (!props.open && isHovered)) && (
            <Box display={"flex"} flexDirection={"column"}>
              <div
                style={{
                  fontWeight: "400",
                  width: "200px",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography noWrap>{item.name}</Typography>
              </div>
              <div
                style={{
                  textOverflow: "ellipsis",
                  width: "200px",
                }}
              >
                <Typography variant="subtitle1" noWrap>
                  {item.topic}
                </Typography>
              </div>
            </Box>
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
          <MenuOptionItem
            item={enrolledOption}
            index={-2}
            key={t("enrolled")}
            canExpanded={true}
          />
          {isExpanded &&
            expanedMenuOptions.map((item, index) => (
              <MenuOptionItem item={item} index={index + 2} key={item.name} />
            ))}
          {isExpanded &&
            listCourses.map((item, index) => (
              <CourseItem
                index={index + 3 + listCourses.length}
                item={item}
                key={item.name}
              />
            ))}
        </List>
        <Divider />
        <List>
          {menuOptions2.map((item, index) => (
            <MenuOptionItem item={item} index={index + 3} key={item.name} />
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;

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
  Grading,
  Group,
  Home,
  School,
  Settings,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCoursesByRole } from "../../api/course/apiCourse";
import {
  IGetCoursesRes,
  RoleCourseNumber,
  RoleCourseString,
} from "../../types/course";
import toast from "../../utils/toast";
import { IToastError } from "../../types/common";
import { getUserById } from "../../api/user/apiUser";
import { IUserProfileRes } from "../../types/user";

const drawerWidth = 300;

interface Props {
  open: boolean;
}

interface ClassPreview {
  class: IGetCoursesRes;
  ownerAvatar: string;
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

  const [isTeachingListExpanded, setIsTeachingListExpanded] = useState(false);
  const [isEnrolledListExpanded, setIsEnrolledListExpanded] = useState(false);

  const [classList, setClassList] = useState<ClassPreview[]>([]);
  const [teachList, setTeachList] = useState<ClassPreview[]>([]);
  const [ownList, setOwnList] = useState<ClassPreview[]>([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [t] = useTranslation("global");

  const getUserInfoById = async (
    userId: number
  ): Promise<IUserProfileRes | null> => {
    try {
      const response = await getUserById(userId);
      return response;
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
  };

  useEffect(() => {
    document.title = t("homePage");

    getCoursesByRole(RoleCourseString.Student)
      .then(async (res: IGetCoursesRes[]) => {
        const classPreviews = await Promise.all(
          res.map(async (course) => {
            const teacherId = course.course.userCourses.find(
              (item) => item.userRoleCourse == RoleCourseNumber.Teacher
            )?.userId;
            const user = await getUserInfoById(teacherId!);
            return {
              class: course,
              ownerAvatar: user?.avatar || "",
            };
          })
        );
        setClassList(classPreviews);
        //setClassList(res);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
    getCoursesByRole(RoleCourseString.Coteacher)
      .then(async (res: IGetCoursesRes[]) => {
        const classPreviews = await Promise.all(
          res.map(async (course) => {
            const teacherId = course.course.userCourses.find(
              (item) => item.userRoleCourse == RoleCourseNumber.Teacher
            )?.userId;
            const user = await getUserInfoById(teacherId!);
            return {
              class: course,
              ownerAvatar: user?.avatar || "",
            };
          })
        );
        setTeachList(classPreviews);
        //setClassList(res);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
    getCoursesByRole(RoleCourseString.Teacher)
      .then(async (res: IGetCoursesRes[]) => {
        const classPreviews = await Promise.all(
          res.map(async (course) => {
            const user = await getUserInfoById(course.userId);
            return {
              class: course,
              ownerAvatar: user?.avatar || "",
            };
          })
        );
        setOwnList(classPreviews);
        //setClassList(res);
        console.log(res);
      })
      .catch((err) => {
        toast.error((err as IToastError).detail.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/calendar":
        setSelectedIndex(1);
        break;
      case "/to-review":
        setSelectedIndex(2);
        break;
      case "/todo":
        setSelectedIndex(3);
        break;
      case "/archived":
        setSelectedIndex(4);
        break;
      case "/settings":
        setSelectedIndex(5);
        break;

      // default:
      //   setSelectedIndex(-1);
      //   break;
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

  const teachingOption = new MenuOption({
    name: t("teaching"),
    icon: <Group />,
    onClick: () => {
      setIsTeachingListExpanded(!isTeachingListExpanded);
    },
  });

  const enrolledOption = new MenuOption({
    name: t("enrolled"),
    icon: <School />,
    onClick: () => {
      setIsEnrolledListExpanded(!isEnrolledListExpanded);
    },
  });

  const TeachingMenuOptions: MenuOption[] = [
    new MenuOption({
      name: t("toReview"),
      icon: <Grading />,
      onClick: () => {
        navigate("/to-review");
      },
    }),
  ];

  const EnrolledMenuOptions: MenuOption[] = [
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

  function MenuOptionItem({
    item,
    index,
    canExpanded,
    isExpanded,
  }: {
    item: MenuOption;
    index: number;
    canExpanded?: boolean;
    isExpanded?: boolean;
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

  function CourseItem({ item, index }: { item: ClassPreview; index: number }) {
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
            navigate(`/class/${item.class.course.code}`);
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
              src={item.ownerAvatar}
            ></Avatar>
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
                <Typography noWrap>{item.class.course.nameCourse}</Typography>
              </div>
              <div
                style={{
                  textOverflow: "ellipsis",
                  width: "200px",
                }}
              >
                <Typography variant="subtitle1" noWrap>
                  {item.class.course.topic}
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
        minHeight: "calc(100vh - 64px)",
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
            item={teachingOption}
            index={-2}
            key={t("teaching")}
            canExpanded={true}
            isExpanded={isTeachingListExpanded}
          />
          {isTeachingListExpanded &&
            TeachingMenuOptions.map((item, index) => (
              <MenuOptionItem item={item} index={index + 2} key={item.name} />
            ))}
          {isTeachingListExpanded &&
            ownList.map((item, index) => (
              <CourseItem
                index={index + 6}
                item={item}
                key={item.class.course.nameCourse}
              />
            ))}
        </List>
        <Divider />
        <List>
          <MenuOptionItem
            item={enrolledOption}
            index={-2}
            key={t("enrolled")}
            canExpanded={true}
            isExpanded={isEnrolledListExpanded}
          />
          {isEnrolledListExpanded &&
            EnrolledMenuOptions.map((item, index) => (
              <MenuOptionItem item={item} index={index + 3} key={item.name} />
            ))}
          {isEnrolledListExpanded &&
            classList.map((item, index) => (
              <CourseItem
                index={index + 6 + teachList.length + ownList.length}
                item={item}
                key={item.class.course.nameCourse}
              />
            ))}
        </List>
        <Divider />
        <List>
          {menuOptions2.map((item, index) => (
            <MenuOptionItem item={item} index={index + 4} key={item.name} />
          ))}
        </List>
      </div>
    </Box>
  );
};

export default MiniDrawer;

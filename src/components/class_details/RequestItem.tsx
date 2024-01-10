import { useEffect, useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import { getUserById } from "../../api/user/apiUser";
import { IGradeReviewRequest, IGradeScale } from "../../types/grade";
import { IUserProfileRes } from "../../types/user";
import React from "react";
import { getGradeCompositionById } from "../../api/grade/apiGrade";
import { useNavigate } from "react-router-dom";

interface Props {
  review: IGradeReviewRequest;
}

export default function RequestItem({ review }: Props) {
  const [user, setUser] = useState<IUserProfileRes | undefined>(undefined);
  const [gradeComposition, setGradeComposition] = useState<IGradeScale>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(review.userId)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getGradeCompositionById(review.gradeBoard.gradeScaleId)
      .then((res) => {
        setGradeComposition(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItem>
      <ListItemButton
        sx={{
          gap: "16px",
        }}
        onClick={() => {
          let pathname = window.location.pathname;
          while (pathname.endsWith("/")) {
            pathname = pathname.slice(0, pathname.length - 1);
          }
          while (!pathname.endsWith("/")) {
            pathname = pathname.slice(0, pathname.length - 1);
          }
          navigate(`${pathname}request/${review.id}`);
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={user?.name + " " + user?.surname}
            src={user?.avatar}
            sx={{
              width: 80,
              height: 80,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1" marginBottom={"8px"}>
                {review.studentCode} - {review.gradeBoard.name}{" "}
                {review.gradeBoard.surname}
              </Typography>
              <Typography variant="body2" marginBottom={"8px"}>
                Grade Composition: {gradeComposition?.title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                variant="body2"
                color="textSecondary"
                marginBottom={"8px"}
              >
                Status:{" "}
                <Chip
                  label={review.status}
                  color={
                    review.status === "Pending"
                      ? "warning"
                      : review.status === "Approved"
                      ? "success"
                      : "error"
                  }
                />
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                marginBottom={"8px"}
              >
                Time: {new Date(review.createdTime).toLocaleString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

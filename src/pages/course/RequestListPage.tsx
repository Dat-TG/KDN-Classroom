import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const reviews = [
  { id: 1, studentName: "John Doe", time: "10:00 AM" },
  { id: 2, studentName: "Jane Smith", time: "11:30 AM" },
  { id: 3, studentName: "Bob Johnson", time: "2:45 PM" },
];

const RequestListPage: React.FC = () => {
  const navigate = useNavigate();
  const handleReviewClick = (reviewId: number) => {
    console.log(`review click ${reviewId}`);
    navigate(window.location.pathname + "/" + reviewId);
  };

  const { t } = useTranslation("global");

  return (
    <div
      style={{
        padding: "32px",
      }}
    >
      <Typography variant="h5">{t("requestList")}</Typography>
      <List>
        {reviews.map((review) => (
          <ListItem
            key={review.id}
            onClick={() => handleReviewClick(review.id)}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{review.studentName.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={review.studentName}
                secondary={review.time}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RequestListPage;

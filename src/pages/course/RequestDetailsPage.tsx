import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";

interface Comment {
  id: number;
  avatar: string;
  time: string;
  content: string;
}

export default function RequestDetailsPage() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { t } = useTranslation("global");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      avatar: "https://example.com/avatar.png",
      time: new Date().toLocaleString(),
      content: comment,
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  const requestDetails = {
    id: 1,
    studentAccountId: 12,
    studentName: "John Doe",
    time: "10:00 AM",
    classCode: 123,
    requestGradeCompositon: [
      {
        name: "Homework",
        scale: 0.3,
        currentGrade: 0,
        expectedGrade: 10,
        explain: "Em được 10 mà ở đây là 0",
      },
      {
        name: "Final",
        scale: 0.7,
        currentGrade: 8,
        expectedGrade: 10,
        explain: "Em nhớ làm đúng hết mà",
      },
    ],
  };

  return (
    <Container
      sx={{
        padding: "32px",
      }}
    >
      <ListItem
        sx={{
          marginBottom: "16px",
        }}
      >
        <ListItemAvatar>
          <Avatar>{requestDetails.studentName[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={requestDetails.studentName}
          secondary={requestDetails.time}
        />
      </ListItem>

      <ReactTabulator
        data={requestDetails.requestGradeCompositon}
        options={{
          layout: "fitDataTable",
          height: "auto",
        }}
        columns={[
          {
            title: "Name",
            field: "name",
            sorter: "string",
          },
          {
            title: "Scale",
            field: "scale",
            sorter: "number",
          },
          {
            title: "Current grade",
            field: "currentGrade",
            sorter: "number",
          },
          {
            title: "Expected grade",
            field: "expectedGrade",

            sorter: "number",
          },
          {
            title: "Explain",
            field: "explain",
            formatter: "textarea",

            sorter: "string",
          },
        ]}
      />

      <Box mt={4}>
        <textarea
          style={{
            width: "100%",
            height: "100px",
            resize: "none",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          className="comment-field"
          placeholder={t("typeCommentHere")}
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
        >
          {t("comment")}
        </Button>
      </Box>

      <Box mt={4}>
        {comments.map((comment) => (
          <Box key={comment.id} display="flex" mb={2}>
            <Avatar src={comment.avatar} alt="Avatar" />
            <Box ml={2}>
              <Typography variant="subtitle2">{comment.time}</Typography>
              <p
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {comment.content}
              </p>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

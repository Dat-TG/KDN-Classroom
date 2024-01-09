import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";
import { IComment, IGradeReviewRequest, IGradeScale } from "../../types/grade";
import {
  getAllComments,
  getGradeCompositionById,
  getRequestDetails,
  postComment,
} from "../../api/grade/apiGrade";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/user/apiUser";
import { IUserProfileRes } from "../../types/user";
import SingleComment from "../../components/class_details/SingleComment";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";

export default function RequestDetailsPage() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const { t } = useTranslation("global");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    postComment(parseInt(requestId!), comment)
      .then((res) => {
        console.log(res);
        setComments([
          ...comments,
          {
            id: res.id,
            comment: comment,
            createdTime: new Date().toLocaleString(),
            updatedTime: new Date().toLocaleString(),
            userId: user!.id,
            requestReviewId: parseInt(requestId!),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    setComment("");
  };

  const { requestId } = useParams();

  const [requestDetails, setRequestDetails] = useState<IGradeReviewRequest>();
  const [author, setAuthor] = useState<IUserProfileRes | undefined>(undefined);
  const [gradeComposition, setGradeComposition] = useState<IGradeScale>();

  const user = useSelector(sGetUserInfo);

  useEffect(() => {
    getRequestDetails(parseInt(requestId!))
      .then((res) => {
        setRequestDetails(res.data);
        const review = res.data as IGradeReviewRequest;
        getUserById(review.userId)
          .then((res) => {
            setAuthor(res);
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
        getAllComments(review.id)
          .then((res) => {
            setComments(res.commentRequests as IComment[]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      sx={{
        padding: "32px",
      }}
    >
      <ListItem
        sx={{
          marginBottom: "16px",
          gap: "16px",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={author?.name + " " + author?.surname}
            src={author?.avatar}
            sx={{
              width: 60,
              height: 60,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            requestDetails?.gradeBoard.studentCode +
            " - " +
            requestDetails?.gradeBoard.name +
            " " +
            requestDetails?.gradeBoard.surname +
            " (" +
            author?.name +
            " " +
            author?.surname +
            ")"
          }
          primaryTypographyProps={{
            fontWeight: "500",
            fontSize: "1.2rem",
          }}
          secondary={
            requestDetails?.createdTime
              ? new Date(requestDetails.createdTime).toLocaleString()
              : ""
          }
        />
      </ListItem>

      <ReactTabulator
        data={[
          {
            name: gradeComposition?.title,
            scale: gradeComposition?.scale,
            currentGrade: requestDetails?.currentGrade,
            expectedGrade: requestDetails?.expectGrade,
            explain: requestDetails?.explanation,
          },
        ]}
        options={{
          layout: "fitDataTable",
          height: "auto",
        }}
        columns={[
          {
            title: "Grade Composition",
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
          <SingleComment key={comment.id} commentData={comment} />
        ))}
      </Box>
    </Container>
  );
}

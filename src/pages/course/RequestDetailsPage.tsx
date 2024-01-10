import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { useTranslation } from "react-i18next";
import { IComment, IGradeReviewRequest, IGradeScale } from "../../types/grade";
import {
  approveRequest,
  getAllComments,
  getGradeCompositionById,
  getRequestDetails,
  postComment,
  rejectRequest,
  updateGradeBoard,
} from "../../api/grade/apiGrade";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/user/apiUser";
import { IUserProfileRes } from "../../types/user";
import SingleComment from "../../components/class_details/SingleComment";
import { useSelector } from "react-redux";
import { sGetUserInfo } from "../../store/user/selector";
import { Block, Cancel, CheckCircle } from "@mui/icons-material";
import toast from "../../utils/toast";

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

  const onApprove = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(gradeRef.current?.value);
    approveRequest(requestDetails!.id)
      .then((res) => {
        console.log(res);
        toast.success("Request approved");
        // updateGradeBoard([
        //   {
        //     courseId: requestDetails!.courseId,
        //     grade:
        //       parseFloat(gradeRef.current!.value) ??
        //       requestDetails?.currentGrade ??
        //       0,
        //     gradeScaleId: requestDetails!.gradeBoard.gradeScaleId,
        //     id: requestDetails!.gradeBoard.id,
        //     studentCode: requestDetails!.gradeBoard.studentCode,
        //     name: requestDetails!.gradeBoard.name,
        //     surname: requestDetails!.gradeBoard.surname,
        //     position: requestDetails!.gradeBoard.position,
        //   },
        // ])
        //   .then((res) => {
        //     console.log(res);
        //     toast.success(t("updateGradeSuccessfully"));
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     toast.error(t("updateGradeUnsuccessfully"));
        //   });
      })
      .catch((err) => {
        console.log(err);
        toast.error(t("notSuccessful"));
      });
  };
  const onCancel = () => {};
  const onReject = (event: React.FormEvent) => {
    event.preventDefault();
    rejectRequest(requestDetails!.id, rejectRef.current!.value)
      .then((res) => {
        console.log(res);
        toast.success(t("requestRejected"));
      })
      .catch((err) => {
        console.log(err);
        toast.error(t("notSuccessful"));
      });
  };
  const { requestId } = useParams();

  const [requestDetails, setRequestDetails] =
    useState<IGradeReviewRequest | null>(null);
  const [author, setAuthor] = useState<IUserProfileRes | null>(null);
  const [gradeComposition, setGradeComposition] = useState<IGradeScale>();

  const user = useSelector(sGetUserInfo);

  const gradeRef = useRef<HTMLInputElement>(null);

  const rejectRef = useRef<HTMLTextAreaElement>(null);

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
      {requestDetails == null || user == null ? (
        <Box display="flex" alignItems="center" mb={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box ml={2} width="100%">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        </Box>
      ) : (
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
      )}

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

      {user?.id !== author?.id && (
        <Box display={"flex"} gap={"32px"} alignItems={"center"}>
          <form
            onSubmit={onApprove}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
              gap: "16px",
              flex: 1,
            }}
          >
            <TextField
              inputRef={gradeRef}
              sx={{
                marginTop: "16px",
              }}
              type="number"
              inputProps={{
                step: "any",
              }}
              label={t("updatedGrade")}
              variant="outlined"
              required
            />
            <Box display={"flex"} gap={"16px"}>
              <Button
                component="button"
                type="submit"
                variant="contained"
                startIcon={<CheckCircle />}
              >
                {t("approve")}
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              width: "1px",
              height: "150px",
              backgroundColor: "#ccc",
            }}
          />
          <form
            onSubmit={onReject}
            style={{
              flex: 3,
              alignItems: "space-between",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <textarea
              ref={rejectRef}
              style={{
                width: "100%",
                height: "100px",
                resize: "none",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                marginTop: "16px",
              }}
              placeholder={t("typeCommentHere")}
              required
            />
            <Box display={"flex"} gap={"16px"}>
              <Button
                component="button"
                type="submit"
                variant="outlined"
                startIcon={<Block />}
                onClick={onReject}
              >
                {t("reject")}
              </Button>
            </Box>
          </form>
        </Box>
      )}

      {user?.id !== author?.id ? (
        <></>
      ) : (
        <Box marginTop={"16px"}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<Cancel />}
            onClick={onCancel}
          >
            {t("cancel")}
          </Button>
        </Box>
      )}

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

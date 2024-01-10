import { useEffect, useState } from "react";
import { List, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { IGradeReviewRequest } from "../../types/grade";
import {
  getGradeReviewRequestListStudent,
  getGradeReviewRequestListTeacher,
} from "../../api/grade/apiGrade";
import toast from "../../utils/toast";
import RequestItem from "../../components/class_details/RequestItem";

interface IRequestListPageProps {
  isStudent: boolean;
}

export default function RequestListPage({ isStudent }: IRequestListPageProps) {
  const { t } = useTranslation("global");

  const [reviews, setReviews] = useState<IGradeReviewRequest[] | null>(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (isStudent) {
      getGradeReviewRequestListStudent(parseInt(searchParams.get("courseId")!))
        .then((res) => {
          console.log(res);
          setReviews(res.requestReviews);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.detail.message);
        });
    } else {
      getGradeReviewRequestListTeacher(parseInt(searchParams.get("courseId")!))
        .then((res) => {
          console.log(res);
          setReviews(res.requestReviews);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.detail.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        padding: "32px",
      }}
    >
      <Typography variant="h5">{t("requestList")}</Typography>
      {reviews != null ? (
        <List>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <RequestItem key={review.id} review={review} />
            ))
          ) : (
            <Typography variant="body1">{t("noRequest")}</Typography>
          )}
        </List>
      ) : (
        <div
          style={{
            gap: "16px",
          }}
        >
          <Skeleton
            variant="rectangular"
            height={150}
            sx={{
              margin: "16px",
            }}
          />
          <Skeleton
            variant="rectangular"
            height={150}
            sx={{
              margin: "16px",
            }}
          />
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";
import { IComment } from "../../types/grade";
import { IUserProfileRes } from "../../types/user";
import { getUserById } from "../../api/user/apiUser";

// Props interface for Comment component
interface CommentProps {
  commentData: IComment;
}

const SingleComment: React.FC<CommentProps> = ({ commentData }) => {
  const [userData, setUserData] = useState<IUserProfileRes | null>(null);

  useEffect(() => {
    getUserById(commentData.userId)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [commentData.userId]);

  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: "16px",
      }}
    >
      <CardContent>
        {userData == null ? (
          <Box display="flex" alignItems="center" mb={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box ml={2} width="100%">
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Box>
        ) : (
          <>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar alt={userData?.name} src={userData?.avatar} />
              <Box ml={2}>
                <Typography fontSize={"1.1rem"} fontWeight="bold">
                  {userData?.name + " " + userData?.surname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* Display comment creation timestamp */}
                  {new Date(commentData.createdTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" marginBottom={"8px"}>
              {commentData.comment}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {/* Display comment update timestamp */}
              Updated: {new Date(commentData.updatedTime).toLocaleString()}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SingleComment;

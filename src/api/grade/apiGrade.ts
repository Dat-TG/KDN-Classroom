import { IGradeBoard, IGradeScale, IRequestReviewReq } from "../../types/grade";
import AxiosClient from "../axios";

export const getGradeBoard = async (courseId: number) => {
  const response = await AxiosClient.get(`/grade-board/all/${courseId}`);
  return response.data;
};

export const getGradeOfStudent = async (courseId: number) => {
  const response = await AxiosClient.get(`/grade-board/student/${courseId}`);
  return response.data;
};

export const getGradeScale = async (courseId: number) => {
  const response = await AxiosClient.get(`/grade-scale/all/${courseId}`);
  return response.data;
};

export const downloadGradeBoard = async (courseId: number) => {
  const response = await AxiosClient.get(`/grade-board/download-grade-board`, {
    params: {
      courseId,
    },
  });
  return response.data;
};

export const updateGradeScales = async (gradeScales: IGradeScale[]) => {
  const response = await AxiosClient.post("/grade-scale/multi-scales", {
    gradeScalesDTO: gradeScales,
  });
  return response.data;
};

export const updateGradeBoard = async (gradeStudent: IGradeBoard[]) => {
  const response = await AxiosClient.post("/grade-board/multi-students", {
    studentsGradeDTO: gradeStudent,
  });
  return response.data;
};

export const markGradeScaleAsFinalized = async (
  courseId: number,
  gradeScaleId: number
) => {
  const response = await AxiosClient.post("/grade-board/update-finalized", {
    courseId,
    gradeScaleId,
  });
  return response.data;
};

export const requestGradeReview = async (data: IRequestReviewReq[]) => {
  const response = await AxiosClient.post("/request-review/multi", {
    requestReviewsDTO: data,
  });
  return response.data;
};

export const getGradeReviewRequestListStudent = async (courseId: number) => {
  const response = await AxiosClient.get(
    `/request-review/student/course/${courseId}`
  );
  return response.data;
};

export const getGradeReviewRequestListTeacher = async (courseId: number) => {
  const response = await AxiosClient.get(`/request-review/course/${courseId}`);
  return response.data;
};

export const getGradeCompositionById = async (id: number) => {
  const response = await AxiosClient.get(`/grade-scale/${id}`);
  return response.data;
};

export const getRequestDetails = async (id: number) => {
  const response = await AxiosClient.get(`/request-review/${id}`);
  return response.data;
};

export const postComment = async (requestReviewId: number, comment: string) => {
  const response = await AxiosClient.post("/comment-request", {
    id: 0,
    comment,
    requestReviewId,
  });
  return response.data;
};

export const getAllComments = async (requestReviewId: number) => {
  const response = await AxiosClient.get(
    `/comment-request/request/${requestReviewId}`
  );
  return response.data;
};

export const approveRequest = async (id: number) => {
  const response = await AxiosClient.post("/request-review/approve", {
    id,
  });
  return response.data;
};

export const rejectRequest = async (id: number, comment: string) => {
  const response = await AxiosClient.post("/request-review/reject", {
    id,
    comment,
  });
  return response.data;
};

export const deleteGradeBoardRow = async (id: number) => {
  const response = await AxiosClient.delete(`/grade-board/${id}`);
  return response.data;
};

export const deleteGradeScale = async (id: number) => {
  const response = await AxiosClient.delete(`/grade-scale/${id}`);
  return response.data;
};

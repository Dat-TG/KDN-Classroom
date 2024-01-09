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

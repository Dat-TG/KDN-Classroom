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

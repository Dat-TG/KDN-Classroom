import {
  ICreateCoursesReq,
  ICreateInviteLinkReq,
  ISendInviteLinkReq,
  RoleCourseString,
} from "../../types/course";
import AxiosClient from "../axios";

export const createCourse = async (course: ICreateCoursesReq) => {
  const res = await AxiosClient.post("/course", course);
  return res.data;
};

export const getCourseByCode = async (courseCode: string) => {
  const res = await AxiosClient.get(`/course/${courseCode}`);
  return res.data;
};

export const getCourseById = async (courseId: number) => {
  const res = await AxiosClient.get(`/course/detail/${courseId}`);
  return res.data;
};

export const getCoursesByRole = async (role: RoleCourseString) => {
  const res = await AxiosClient.get(`/course/all-course?roleCourse=${role}`);
  return res.data.data;
};

export const joinCourse = async (courseCode: string) => {
  const res = await AxiosClient.post("/course/join-course", {
    courseCode,
  });
  return res.data;
};

export const createInviteLink = async (params: ICreateInviteLinkReq) => {
  const res = await AxiosClient.post("/course/generate-link", params);
  return res.data;
};

export const acceptInviteLink = async (token: string) => {
  const res = await AxiosClient.post(`/course/accept-invite`, {
    token,
  });
  return res.data;
};

export const sendInviteLink = async (params: ISendInviteLinkReq) => {
  const res = await AxiosClient.post("/course/send-invitation", params);
  return res.data;
};

export const updateCourseColor = async (
  courseId: number,
  courseColor: string
) => {
  const res = await AxiosClient.post("/course/color", {
    id: courseId,
    courseColor,
  });
  return res.data;
};

export const updateCourseBackground = async (
  courseId: number,
  courseBackground: string
) => {
  const res = await AxiosClient.post("/course/background", {
    id: courseId,
    courseBackground,
  });
  return res.data;
};

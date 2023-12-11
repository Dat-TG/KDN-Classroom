import {
  ICreateCoursesReq,
  ICreateInviteLinkReq,
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

export const getCoursesByRole = async (role: RoleCourseString) => {
  const res = await AxiosClient.get(`/course/all-course?roleCourse=${role}`);
  return res.data;
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

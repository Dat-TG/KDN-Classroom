export enum RoleCourseString {
  Teacher = "Teacher",
  Coteacher = "Coteacher",
  Student = "Student",
}

export enum RoleCourseNumber {
  Teacher = 1,
  Coteacher = 2,
  Student = 3,
}

export interface IUserCourse {
  id: number;
  userId: number;
  courseId: number;
  userRoleCourse: RoleCourseNumber;
}

export interface ICourse {
  id: number;
  nameCourse: string;
  description: string;
  part: string;
  room: string;
  topic: string;
  code: string;
  userCourses: IUserCourse[];
}

export interface IGetCoursesRes {
  id: number;
  userId: number;
  courseId: number;
  userRoleCourse: RoleCourseNumber;
  course: ICourse;
}

export interface ICreateCoursesReq {
  id: 0;
  nameCourse: string;
  description: string;
  part: string;
  room: string;
  topic: string;
}

export interface ICreateInviteLinkReq {
  courseCode: string;
  roleCourse: RoleCourseString;
}

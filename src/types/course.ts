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
  courseColor?: string;
  courseBackground?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gradeBoard: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestReview: any[];
}

export interface IGetCoursesRes {
  id: number;
  userId: number;
  courseId: number;
  userRoleCourse: RoleCourseNumber;
  course: ICourse;
}

export interface IGetCoursesResList {
  listCourse: IGetCoursesRes[];
  listCourseBan: IGetCoursesRes[];
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

export interface ISendInviteLinkReq {
  emailAddress: string;
  courseCode: string;
  roleCourse: RoleCourseString;
}

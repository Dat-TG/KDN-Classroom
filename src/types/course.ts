export interface IUserCourse {
  id: number;
  userId: number;
  courseId: number;
  userRoleCourse: number;
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
  userRoleCourse: number;
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
  roleCourse: string;
}

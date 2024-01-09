export interface IGradeScale {
  title: string;
  scale: number;
  id: number;
  courseId: number;
  position: number;
}

export interface IGradeScaleWithFinalized {
  title: string;
  scale: number;
  id: number;
  courseId: number;
  position: number;
  isFinalized: boolean;
}

export interface IGradeBoard {
  id: number;
  courseId: number;
  studentCode: string;
  name: string;
  surname: string;
  grade: number;
  gradeScaleId: number;
  position: number;
}

export interface IGradeBoardWithFinalized {
  id: number;
  courseId: number;
  studentCode: string;
  name: string;
  surname: string;
  grade: number;
  gradeScaleId: number;
  position: number;
  isFinalized: boolean;
}

export interface IRequestReviewReq {
  id: number;
  courseId: number;
  studentCode: string;
  gradeId: number;
  currentGrade: number;
  expectGrade: number;
  explanation: string;
}

export interface IGradeReviewRequest {
  id: number;
  userId: number;
  courseId: number;
  gradeId: number;
  currentGrade: number;
  expectGrade: number;
  explanation: string;
  status: string;
  studentCode: string;
  gradeBoard: IGradeBoardWithFinalized;
  createdTime: string;
  updatedTime: string;
  commentRequest: IComment[];
}

export interface IComment {
  id: number;
  comment: string;
  requestReviewId: number;
  createdTime: string;
  updatedTime: string;
  userId: number;
}

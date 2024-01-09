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

// CourseContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ICourseDisplay } from "../types/course";

interface CourseData {
  ownList: ICourseDisplay[]; // Adjust the type based on your actual data structure
  teachList: ICourseDisplay[]; // Adjust the type based on your actual data structure
  classList: ICourseDisplay[]; // Adjust the type based on your actual data structure
}

interface LoadingState {
  ownList: boolean;
  teachList: boolean;
  classList: boolean;
}

interface CourseContextType {
  courseData: CourseData;
  setCourseData: Dispatch<SetStateAction<CourseData>>;
  loadingState: LoadingState;
  setLoadingState: Dispatch<SetStateAction<LoadingState>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

interface CourseProviderProps {
  children: ReactNode;
}

const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courseData, setCourseData] = useState<CourseData>({
    ownList: [],
    teachList: [],
    classList: [],
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    ownList: false,
    teachList: false,
    classList: false,
  });

  return (
    <CourseContext.Provider
      value={{ courseData, setCourseData, loadingState, setLoadingState }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export { CourseContext, CourseProvider };

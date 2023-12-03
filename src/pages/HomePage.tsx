import { useNavigate } from "react-router-dom";
import { userApi } from "../api/axios";
import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CourseCard from "../components/homepage/CourseCard";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
        <Grid container sx={{ margin: "30px", rowGap: 3 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <Grid item key={index} sx={{ml: 2, mr: 2}}>

              <CourseCard />
            </Grid>
          ))}
        </Grid>
    </>
  );
}

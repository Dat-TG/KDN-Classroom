import { Check } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

interface Props {
  list: string[];
  currentImage: string;
  callback: (image: string) => void;
}
export default function ListBackgroundImage(props: Props) {
  return (
    <>
      <Grid container spacing={2}>
        {props.list.map((image, index) => {
          return (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  ":hover": {
                    opacity: 0.8,
                  },
                }}
                width={"100%"}
                height={"100%"}
              >
                <img
                  src={image}
                  alt={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    props.callback(image);
                  }}
                />
                {props.currentImage === props.list[index] && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                    }}
                  >
                    <Check
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "3rem",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

import * as React from "react";
import { Typography, Box } from "@mui/material";
import LandingBtn from "../Buttons/LandingButton";

export default function AboutMe() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "50%",
        padding: "1rem 0 0 0rem",
      }}
    >
      <Typography gutterBottom fontWeight={800} variant="h2">
        Cameron Petrie
      </Typography>
      <Typography
        paddingBottom="2.5rem"
        lineHeight="2.5"
        fontWeight={600}
        gutterBottom
        textTransform="uppercase"
        variant="subtitle1"
      >
        Full Stack Software Engineer, Data Analyst, and 3D modeler
      </Typography>
      <Typography
        lineHeight="2.5"
        fontWeight={100}
        gutterBottom
        paddingBottom="2.5rem"
        variant="body1"
        // maxWidth="40%"
      >
        Disciplined, pragmatic, and creative software engineer and data analyst
        with an interest in all facets of data and its analysis, statistics,
        political science, machine learning, and economic growth theory.
      </Typography>
      <LandingBtn>Lets Connect</LandingBtn>
    </Box>
  );
}

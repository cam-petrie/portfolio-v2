import * as React from "react";
import { Typography, Box } from "@mui/material";
import LandingBtn from "../Buttons/LandingButton";
import SocialsBar from "../Buttons/Socials";
import { theme } from "../../App";
import Contact from "../ContactForm/Contact";

export default function AboutMe() {
  const [contact, setContact] = React.useState(false);
  return (
    <Box
      sx={{
        height: "100%",
        width: { md: "50%", xs: "95%" },
        padding: {
          lg: "1rem 0 0 0rem",
          md: "1rem 0 0 0",
          xs: "1rem 2.5rem 1rem 1rem",
        },
      }}
    >
      <Typography
        gutterBottom
        color={theme.palette.primary.highlight}
        fontWeight={800}
        variant="h2"
      >
        Cameron Petrie
      </Typography>

      {contact ? (
        <Contact />
      ) : (
        <>
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
            Disciplined, pragmatic, and creative software engineer and data
            analyst with an interest in all facets of data and its analysis,
            statistics, political science, machine learning, and economic growth
            theory.
          </Typography>
        </>
      )}

      <LandingBtn fontSize="1.5rem" contact={contact} setContact={setContact}>
        {contact ? "Go Back" : "Lets Connect"}
      </LandingBtn>
      <SocialsBar />
    </Box>
  );
}

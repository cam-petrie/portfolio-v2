import * as React from "react";
import { Typography, Box } from "@mui/material";
import LandingBtn from "../Buttons/LandingButton";
import SocialsBar from "../Buttons/Socials";
import Scene from "../3D Modeling/Scene";
import OrbitController from "../3D Modeling/Controller";
import Laptop from "../3D Modeling/Models/Laptop";
import { theme } from "../../App";
import Contact from "../ContactForm/Contact";
import about from "../../resources/landing_page.json";

export default function AboutMe() {
  const [contact, setContact] = React.useState(false);
  return (
    <Box
      sx={{
        height: "100%",
        width: { md: "50%", xs: "95%" },
        padding: {
          lg: "5rem 0 0 0rem",
          md: "1rem 0 0 0",
          xs: "1rem 2.5rem 1rem 1rem",
        },
      }}
    >
      <Typography
        gutterBottom
        color={theme.palette.primary.text.heading}
        fontWeight={800}
        variant="h2"
      >
        {about.heading}
      </Typography>
      <Box
        sx={{
          mt: "5rem",
          height: "400px",
          width: "100%",
        }}
      >
        <Scene controls={<OrbitController />}>
          <Laptop />
        </Scene>
      </Box>

      {contact ? (
        <Contact />
      ) : (
        <>
          <Typography
            color={theme.palette.primary.text.subheading}
            padding="5rem 0 5rem 0"
            fontWeight={400}
            gutterBottom
            fontSize="1.25rem"
          >
            {about.subheading}
          </Typography>
        </>
      )}

      <LandingBtn fontSize="2rem" contact={contact} setContact={setContact}>
        {contact ? "Go Back" : "Lets Connect"}
      </LandingBtn>
      <SocialsBar />
    </Box>
  );
}

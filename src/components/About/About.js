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
        width: { md: "50%", sm: "100%" },
        padding: {
          lg: "1rem 0 0 0rem",
          md: "1rem 0 0 0",
          xs: "1rem",
        },
      }}
    >
      <Typography
        color={theme.palette.primary.text.heading}
        fontWeight={800}
        variant="h3"
      >
        {about.heading}
      </Typography>

      {contact ? (
        <Contact />
      ) : (
        <>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ display: { sm: "block", md: "none" }, mt: "2.5rem" }}
            color={theme.palette.primary.text.heading}
          >
            About
          </Typography>
          <Typography
            color={theme.palette.primary.text.subheading}
            padding="1rem 0 1rem 0"
            fontWeight={400}
            gutterBottom
            variant="subtitle1"
          >
            {about.subheading}
          </Typography>

          <Box
            sx={{
              mt: "1rem",
              height: "45vh",
              width: "100%",
            }}
          >
            <Scene controls={<OrbitController />}>
              <Laptop />
            </Scene>
          </Box>
        </>
      )}

      <LandingBtn fontSize="1.75rem" contact={contact} setContact={setContact}>
        {contact ? "Go Back" : "Lets Connect"}
      </LandingBtn>
      <SocialsBar />
    </Box>
  );
}

import * as React from "react";
import { Typography, Box, Link } from "@mui/material";
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
  const [typedHeading, setTypedHeading] = React.useState("");
  const [typedSubheading, setTypedSubheading] = React.useState("");

  const linkText = "CTS.";
  const linkStart = about.subheading.lastIndexOf(linkText);
  const headingComplete = typedHeading.length === about.heading.length;
  const subheadingComplete = typedSubheading.length === about.subheading.length;
  const typedSubheadingBeforeLink = typedSubheading.slice(0, linkStart);
  const typedSubheadingLink = typedSubheading.slice(linkStart);

  React.useEffect(() => {
    const isTypingHeading = typedHeading.length < about.heading.length;
    const isTypingSubheading =
      !isTypingHeading && typedSubheading.length < about.subheading.length;

    if (!isTypingHeading && !isTypingSubheading) {
      return undefined;
    }

    const timeout = setTimeout(
      () => {
        if (isTypingHeading) {
          setTypedHeading(about.heading.slice(0, typedHeading.length + 1));
          return;
        }

        setTypedSubheading(
          about.subheading.slice(0, typedSubheading.length + 1)
        );
      },
      isTypingHeading ? 55 : 18
    );

    return () => clearTimeout(timeout);
  }, [typedHeading, typedSubheading]);

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
        {typedHeading}
        {!headingComplete ? "|" : null}
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
            sx={{ minHeight: { xs: "8.5rem", md: "7rem" } }}
          >
            {typedSubheadingBeforeLink}
            {typedSubheadingLink ? (
              <Link
                href={about.link}
                target="_blank"
                color={theme.palette.primary.text.subheading}
              >
                {typedSubheadingLink}
              </Link>
            ) : null}
            {headingComplete && !subheadingComplete ? "|" : null}
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
        {contact ? "Go Back" : "Contact Me"}
      </LandingBtn>
      <SocialsBar />
    </Box>
  );
}

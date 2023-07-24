import * as React from "react";
import { Box } from "@mui/material";
import AboutMe from "../../components/About/About";
import SocialsBar from "../../components/Buttons/Socials";
import SkillNav from "../../components/Navbar/Navbar";
import FrontEnd from "../../components/FrontEnd/Cards";
export default function Landing() {
  return (
    <Box
      className="landing"
      sx={{
        padding: "5rem 0 0 1rem",
        position: "fixed",
        display: "flex",
        height: "100%",
      }}
      color="primary.text"
    >
      <SocialsBar />
      <AboutMe />
      <Box sx={{ display: "block", width: "100%" }} className="magic-box">
        <SkillNav />
        <FrontEnd />
      </Box>
    </Box>
  );
}

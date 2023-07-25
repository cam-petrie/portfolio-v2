import * as React from "react";
import { Box } from "@mui/material";
import AboutMe from "../../components/About/About";
import SocialsBar from "../../components/Buttons/Socials";
import SkillNav from "../../components/Navbar/Navbar";
import FrontEnd from "../../components/FrontEnd/Cards";
import { theme } from "../../App";
export default function Landing() {
  React.useEffect(() => {
    let child = document.getElementById("magic-box");
    console.log(child.offsetWidth);

    child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
  });
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
      <Box
        sx={{
          display: "block",
          width: "100%",
          paddingLeft: "2.5rem",
          overflow: "auto",
          scrollbarColor: theme.palette.primary.highlight,
          scrollbarWidth: "2px",
        }}
        id="magic-box"
        className="magic-box"
      >
        <SkillNav />
        <FrontEnd />
      </Box>
    </Box>
  );
}

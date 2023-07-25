import * as React from "react";
import { Box } from "@mui/material";
import AboutMe from "../../components/About/About";
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
        padding: "2.5rem 0rem 0 5rem",
        position: "fixed",
        display: "flex",
        height: "100%",
      }}
      color="primary.text"
    >
      <AboutMe />
      <Box
        sx={{
          display: "block",
          height: "calc(100% - 50px)",
          width: "100%",
          paddingLeft: "2.5rem",
          overflow: "scroll",
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

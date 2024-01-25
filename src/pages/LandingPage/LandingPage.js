import * as React from "react";
import { Box } from "@mui/material";
import AboutMe from "../../components/About/About";
import SkillNav from "../../components/Navbar/Navbar";
import { theme } from "../../App";
import BackEnd from "../../components/BackEnd/Cards";

export default function Landing() {
  const [component, setComponent] = React.useState(<BackEnd />);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    let child = document.getElementById("magic-box");
    child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
  });

  return (
    <Box
      className="landing"
      bgcolor={theme.palette.primary.main}
      sx={{
        padding: { md: "2.5rem 0rem 0 5rem", xs: "2.5rem 1rem 0 0.5rem" },
        position: { md: "fixed", xs: "relative" },
        display: "flex",
        height: "100%",
        flexDirection: { md: "row", xs: "column" },
      }}
      color="primary.text"
    >
      <AboutMe />
      <Box
        sx={{
          display: "block",
          height: "calc(100% - 50px)",
          width: "100%",
          padding: 1,
          paddingLeft: { md: "2.5rem" },
          overflow: "scroll",
        }}
        id="magic-box"
        className="magic-box"
      >
        <SkillNav
          setComponent={setComponent}
          setChecked={setChecked}
          checked={checked}
        />
        {component}
      </Box>
    </Box>
  );
}

import * as React from "react";
import { Toolbar, Box } from "@mui/material";
import NavLinks from "../Buttons/Button";
import { theme } from "../../App";
import FrontEnd from "../FrontEnd/Cards";
import BackEnd from "../BackEnd/Cards";

export default function SkillNav({ setComponent, setChecked, checked }) {
  let pages = [
    { component: <FrontEnd checked={checked} />, page: "FrontEnd", index: 1 },
    { component: <BackEnd checked={checked} />, page: "BackEnd", index: 2 },
    {
      component: <FrontEnd checked={checked} />,
      page: "3D Modeling",
      index: 3,
    },
    {
      component: <FrontEnd checked={checked} />,
      page: "Data Analysis",
      index: 4,
    },
  ];

  return (
    <>
      <Toolbar
        sx={{
          width: "100%",
          position: "sticky",
          padding: "0 !important",
          top: 0,
          zIndex: 999,

          backgroundColor: theme.palette.primary.main,
        }}
        disableGutters
      >
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "space-evenly",
            display: { xs: "none", md: "flex" },
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {pages.map((page) => (
            <NavLinks
              disableRipple
              key={page.index}
              // onClick={handleCloseNavMenu}
              onClick={() => {
                setComponent(page.component);
              }}
              sx={{
                fontSize: { md: "0.9rem", xs: "12px" },
                mx: 2,
                color: "white",
                display: "block",
              }}
            >
              {page.page}
            </NavLinks>
          ))}
        </Box>
      </Toolbar>
    </>
  );
}

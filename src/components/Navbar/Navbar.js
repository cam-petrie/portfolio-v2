import * as React from "react";
import { Toolbar, Box, Container } from "@mui/material";
import NavLinks from "../Buttons/Button";
import { theme } from "../../App";

export default function SkillNav() {
  let pages = ["FrontEnd", "BackEnd", "3D Modeling", "Data Analysis"];

  return (
    <>
      <Toolbar
        sx={{
          width: "100%",
          position: "sticky",
          padding: "0 !important",
          top: 0,
          backgroundColor: theme.palette.primary.main,
        }}
        disableGutters
      >
        <Box
          sx={{
            zIndex: 999,
            flexGrow: 1,
            justifyContent: "space-evenly",
            display: { xs: "none", md: "flex" },
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {pages.map((page) => (
            <NavLinks
              disableRipple
              key={page}
              // onClick={handleCloseNavMenu}
              sx={{
                mx: 2,
                color: "white",
                display: "block",
              }}
            >
              {page}
            </NavLinks>
          ))}
        </Box>
      </Toolbar>
    </>
  );
}

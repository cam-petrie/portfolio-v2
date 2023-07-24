import * as React from "react";
import { Toolbar, Box, Container } from "@mui/material";
import NavLinks from "../Buttons/Button";

export default function SkillNav() {
  let pages = ["FrontEnd", "BackEnd", "3D Modeling", "Data Analysis"];

  return (
    <>
      <Container sx={{ height: "fit-content" }} maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              zIndex: 999,
              flexGrow: 1,
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
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
      </Container>
    </>
  );
}

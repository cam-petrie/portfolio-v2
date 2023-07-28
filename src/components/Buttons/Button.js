import * as React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const NavLinks = styled(Button)(({ theme }) => ({
  textTransform: "upper",
  borderRadius: "0px",
  fontSize: "0.9rem",
  "&:hover": {
    color: theme.palette.primary.highlight,
  },
  "&:after": {
    display: "block",
    content: '""',
    borderBottom: `2px solid ${theme.palette.primary.highlight}`,
    width: "100%",
    transform: "scaleX(0.5)",
    transition: "transform 250ms ease-in-out",
    transformOrigin: "0% 50%",
  },
  "&:hover:after": {
    transform: "scaleX(1.1)",
  },
  "&:focus": {
    color: theme.palette.primary.highlight,
  },
  "&:focus:after": {
    transform: "scaleX(1.1)",
  },
}));

export default NavLinks;

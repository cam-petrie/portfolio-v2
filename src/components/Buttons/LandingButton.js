import * as React from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const CustomButton = styled(Button)(({ theme, fontSize }) => ({
  fontSize: fontSize,
  background: "none",
  textTransform: "upper",
  padding: 0,
  color: theme.palette.primary.text,
  borderBottom: "none",
  cursor: "pointer",
  outline: "inherit",
  display: "block",
  fontWeight: 400,
  "&:hover": {
    color: theme.palette.primary.highlight,
  },
  "&:after": {
    display: "block",
    content: '""',
    borderBottom: `2px solid ${theme.palette.primary.highlight}`,
    width: "100%",
    transform: "scaleX(0.6)",
    transition: "transform 250ms ease-in-out",
    transformOrigin: "0% 50%",
  },
  "&:hover:after": {
    transform: "scaleX(1.1)",
  },
}));

export default function LandingBtn({
  children,
  contact,
  setContact,
  fontSize,
}) {
  return (
    <CustomButton
      fontSize={fontSize}
      disableRipple
      onClick={() => {
        setContact(!contact);
      }}
    >
      {children}
    </CustomButton>
  );
}

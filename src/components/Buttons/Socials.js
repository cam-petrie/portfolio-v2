import * as React from "react";
import { Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";
import TwitterIcon from "@mui/icons-material/Twitter";

let imageSize = "2rem";

const SocialsButton = styled(Button)(({ theme }) => ({
  padding: 0,

  width: "fit-content",
  color: theme.palette.primary.text,
  "&:hover": {
    color: theme.palette.primary.highlight,
  },
  "&:active": {
    borderColor: theme.palette.primary.highlight,
    color: theme.palette.primary.highlight,
  },
  "&:focus": {
    borderColor: theme.palette.primary.highlight,
    color: theme.palette.primary.highlight,
  },
}));

export default function SocialsBar() {
  let contents = [
    <LinkedInIcon sx={{ fontSize: imageSize }} />,
    <GitHubIcon sx={{ fontSize: imageSize }} />,
    <DownloadIcon sx={{ fontSize: imageSize }} />,
    <TwitterIcon sx={{ fontSize: imageSize }} />,
  ];

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "6rem",
        transform: "translateX(-1rem)",
      }}
    >
      {contents.map((content, i) => (
        <SocialsButton disableRipple>{content}</SocialsButton>
      ))}
    </Box>
  );
}

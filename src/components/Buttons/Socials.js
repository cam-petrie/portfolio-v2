import * as React from "react";
import { Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";
// import TwitterIcon from "@mui/icons-material/Twitter";
import FileSaver from "file-saver";

let imageSize = "2rem";

const saveFile = () => {
  FileSaver.saveAs(
    "/resources/Cameron Petrie_Resume.pdf",
    "Cameron Petrie Resume.pdf"
  );
};

const SocialsButton = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: "64px",
  width: "fit-content",
  color: theme.palette.primary.text.subheading,
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
    {
      icon: <LinkedInIcon sx={{ fontSize: imageSize }} />,
      click: null,
      href: "https://www.linkedin.com/in/cameron-petrie-4b00aa148/",
    },
    {
      icon: <GitHubIcon sx={{ fontSize: imageSize }} />,
      click: null,
      href: "https://github.com/cam-petrie",
    },
    {
      icon: <DownloadIcon sx={{ fontSize: imageSize }} />,
      click: saveFile,
      href: null,
    },
    // {
    //   icon: <TwitterIcon sx={{ fontSize: imageSize }} />,
    //   click: null,
    //   href: "https://twitter.com/KillinCam",
    // },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: { md: "2.5rem", xs: "2.5rem" },
        transform: "translateX(-1rem)",
      }}
    >
      {contents.map((content, i) => (
        <SocialsButton
          key={i}
          onClick={content.click}
          href={content.href}
          target="_blank"
          disableRipple
        >
          {content.icon}
        </SocialsButton>
      ))}
    </Box>
  );
}

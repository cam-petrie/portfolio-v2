import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { keyframes } from "@mui/material";

const textclip = keyframes`
to {
    background-position: 200% center;
  }
`;

export const CustomText = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(-225deg, #f6f7f8 0%,#2ec4b6 29%,#20a4f3 67%,#f6f7f8 100%)`,
  backgroundSize: "200% auto",
  backgroundClip: "text",
  color: "#fff",
  fill: "transparent",
  WebkitTextFillColor: "transparent",
  animation: ` ${textclip} 2s linear infinite`,
  display: "inline-block",
  fontSize: "1.25rem",
  fontWeight: "800",
}));

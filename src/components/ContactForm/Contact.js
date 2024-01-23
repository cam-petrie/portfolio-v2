import * as React from "react";
import { Box, Typography } from "@mui/material";
import Form from "./Form";
import { theme } from "../../App";

export default function Contact() {
  return (
    <>
      <Box>
        <Typography
          color={theme.palette.primary.highlight}
          fontWeight={600}
          gutterBottom
          paddingBottom="2.5rem"
        >
          Lets get in touch! Send me a message and I'll get back to you as soon
          as possible.
        </Typography>
        <Form />
      </Box>
    </>
  );
}

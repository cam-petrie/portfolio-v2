import * as React from "react";
import { Box, Typography } from "@mui/material";
import Form from "./Form";

export default function Contact() {
  return (
    <>
      <Box>
        <Typography gutterBottom paddingBottom="2.5rem">
          Lets get in touch! Send me a message and I'll get back to you as soon
          as possible.
        </Typography>
        <Form />
      </Box>
    </>
  );
}

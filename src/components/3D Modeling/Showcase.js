import { Typography, Box } from "@mui/material";
import * as React from "react";
import { theme } from "../../App";
import { CustomText } from "../Typographies/CustomText";
import Desk from "./Models/Desk";
import Scene from "./Scene";
import OrbitController from "./Controller";

export default function Showcase() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            padding: {
              md: "0 2.5rem 2.5rem 2.5rem",

              sm: "5rem 0 2.5rem 0",
              xs: "5rem 0 2.5rem 0",
            },
          }}
        >
          <Typography color={theme.palette.primary.text.body} variant="body1">
            I love bringing the web to life through the use of{"  "}
            <Typography
              component="span"
              fontWeight={800}
              color={theme.palette.primary.text.body}
              variant="body1"
            >
              3D models
            </Typography>{" "}
            and <CustomText>animations</CustomText>. I have crafted over a
            hundred models from wireframe to implementation. I ensure that any
            models I use in a finished project are compressed and cleaned for
            minimal latency.
          </Typography>
        </Box>
        <Box sx={{ height: "30vw", width: "30vw", margin: "0 auto" }}>
          <Scene controls={<OrbitController />}>
            <Desk />
          </Scene>
        </Box>
      </Box>
    </>
  );
}

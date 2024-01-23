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
      <Box>
        <Box
          sx={{
            margin: {
              md: "2.5rem 12.5rem 1rem 12.5rem",
              xs: "1rem 0rem 1rem 0rem",
            },
            padding: { md: "0 1rem 0 1rem", xs: 0 },
          }}
        >
          <Typography
            color={theme.palette.primary.text.body}
            variant="subtitle1"
            lineHeight={2}
          >
            I love bringing the web to life through the use of{"  "}
            <Typography
              lineHeight={2}
              component="span"
              fontWeight={800}
              color={theme.palette.primary.text.body}
              fontSize="1.2rem"
            >
              3D models
            </Typography>{" "}
            and <CustomText>animations</CustomText>. I have crafted over a
            hundred models from wireframe to implementation. I ensure that any
            models I use in a finished project are compressed and cleaned for
            minimal latency.
          </Typography>
        </Box>
        <Box sx={{ height: "600px" }}>
          <Scene controls={<OrbitController />}>
            <Desk />
          </Scene>
        </Box>
        <Box
          sx={{
            margin: {
              md: "2.5rem 12.5rem 1rem 12.5rem",
              xs: "1rem 0rem 1rem 0rem",
            },
            padding: { md: "0 1rem 0 1rem", xs: 0 },
          }}
        ></Box>
      </Box>
    </>
  );
}

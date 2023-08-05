import { Typography, Box } from "@mui/material";
import * as React from "react";
import { theme } from "../../App";
import { CustomText } from "../Typographies/CustomText";
import Globe from "./Models/Globe";
import Phone from "./Models/Phone";
import Desk from "./Models/Desk";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import OrbitController from "./Controller";

export default function Showcase() {
  return (
    <>
      <Box sx={{ paddingBottom: "10rem" }}>
        <Box
          sx={{
            margin: {
              md: "2.5rem 12.5rem 1rem 12.5rem",
              xs: "1rem 0rem 1rem 0rem",
            },
            padding: { md: "0 1rem 0 1rem", xs: 0 },
          }}
        >
          <Typography variant="subtitle1" lineHeight={2}>
            I love bringing the web to life through the use of{"  "}
            <Typography
              lineHeight={2}
              component="span"
              fontWeight={800}
              color={theme.palette.primary.highlight}
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
        <Scene controls={<OrbitController />}>
          <Desk />
        </Scene>
        <Box
          sx={{
            margin: {
              md: "2.5rem 12.5rem 1rem 12.5rem",
              xs: "1rem 0rem 1rem 0rem",
            },
            padding: { md: "0 1rem 0 1rem", xs: 0 },
          }}
        >
          {/* <Typography variant="subtitle1">
            In the ever-evolving landscape of web design, I find myself thrilled
            by the sheer potential of using 3D models and animations to breathe
            life into the digital realm.
            <Typography
              component="span"
              fontWeight={800}
              color={theme.palette.primary.highlight}
              fontSize="1.2rem"
            >
              3D models
            </Typography>{" "}
            and <CustomText>animations</CustomText>. I have built over a hundred
            models, but here are a few of my recent favorites:
          </Typography> */}
        </Box>
        <Scene
          controls={
            <OrbitControls
              autoRotate={true}
              enableZoom={false}
              enablePan={false}
            />
          }
        >
          <Phone />
        </Scene>
        <Box
          sx={{
            margin: {
              md: "2.5rem 7.5rem 1rem 7.5rem",
              xs: "1rem 0rem 1rem 0rem",
            },
            padding: { md: "0 1rem 0 1rem", xs: 0 },
          }}
        ></Box>
        <Scene
          controls={
            <OrbitControls
              autoRotate={true}
              enableZoom={false}
              enablePan={false}
            />
          }
        >
          <Globe />
        </Scene>
      </Box>
    </>
  );
}

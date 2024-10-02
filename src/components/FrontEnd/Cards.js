import * as React from "react";
import Cards from "../ProjectCards/Cards";
import portfolio from "../../images/portfolio-homepage.png";
import slick from "../../images/slicknspan.png";
import takeover from "../../images/Takeover.png";
import cts from "../../images/cts_newer.png";
import { AnimatePresence } from "framer-motion";
import Showcase from "../3D Modeling/Showcase";
import { Grid, Box } from "@mui/material";
import frontendProjects from "../../resources/frontend_projects.json";

const imageMap = {
  portfolio: portfolio,
  slick: slick,
  takeover: takeover,
  cts: cts,
}

export default function FrontEnd() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AnimatePresence>
        <Grid container spacing={1} p={0}>
          <Showcase />
          {frontendProjects.map((project) => (
            <Cards
              key={project.id}
              link={project.link}
              timing={project.timing}
              heading={project.heading}
              desc={project.desc}
              stack={project.stack}
              src={imageMap[project.src]}
            />
          ))}
        </Grid>
      </AnimatePresence>
    </Box>
  );
}

import * as React from "react";
import Cards from "../ProjectCards/Cards";
import portfolio from "../../images/portfolio-homepage.png";
import slick from "../../images/slicknspan.png";
import takeover from "../../images/Takeover.png";
import cts from "../../images/cts.png";
import survey from "../../images/survey.jpg";
import passive from "../../images/passive.png";
import cogni from "../../images/cogni-full-gif.gif";
import dao from "../../images/dao.jpg";
import { AnimatePresence } from "framer-motion";
import Showcase from "../3D Modeling/Showcase";
import { Grid, Box } from "@mui/material";
import frontendProjects from "../../resources/frontend_projects.json";

const imageMap = {
  portfolio: portfolio,
  slick: slick,
  takeover: takeover,
  cts: cts,
  survey: survey,
  passive: passive,
  cogni: cogni,
  dao: dao,
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
              imageSx={
                project.src === "cogni"
                  ? {
                      backgroundColor: "#0b131e",
                      boxSizing: "border-box",
                      objectFit: "contain",
                      objectPosition: "center center",
                      padding: "0.5rem",
                    }
                  : undefined
              }
            />
          ))}
        </Grid>
      </AnimatePresence>
    </Box>
  );
}

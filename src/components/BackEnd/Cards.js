import * as React from "react";
import Cards from "../ProjectCards/Cards";
import authentication from "../../images/blog-authentication.png";
import mongo from "../../images/mongodb.png";
import blockchain from "../../images/blockchain.png";
import db from "../../images/db_migration.png";
import cts from "../../images/cts.png";
import survey from "../../images/survey.jpg";
import passive from "../../images/passive.png";
import cogni from "../../images/cogni-full-gif.gif";
import dao from "../../images/dao.jpg";
import { Grid } from "@mui/material";
import backendProjects from "../../resources/backend_projects.json";

const imageMap = {
  mongo: mongo,
  blockchain: blockchain,
  db: db,
  authentication: authentication,
  cts: cts,
  survey: survey,
  passive: passive,
  cogni: cogni,
  dao: dao,
}

export default function BackEnd() {
  return (
    <Grid container spacing={1} p={0}>
      {backendProjects.map((project) => (
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
  );
}

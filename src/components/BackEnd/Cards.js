import * as React from "react";
import Cards from "../ProjectCards/Cards";
import authentication from "../../images/blog-authentication.png";
import mongo from "../../images/mongodb.png";
import blockchain from "../../images/blockchain.png";
import db from "../../images/db_migration.png";
import cts from "../../images/cts_newer.png";
import { Grid } from "@mui/material";
import backendProjects from "../../resources/backend_projects.json";

const imageMap = {
  mongo: mongo,
  blockchain: blockchain,
  db: db,
  authentication: authentication,
  cts: cts,
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
        />
      ))}
    </Grid>
  );
}

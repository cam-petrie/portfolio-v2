import * as React from "react";
import { Typography, Box, Grid } from "@mui/material";
import { theme } from "../../App";
import ResearchCard from "../ProjectCards/ResearchCards";
import ResearchProjects from "../../resources/research_projects.json";
import source_lineage from "../../images/neo4j_example.png";
import premier from "../../images/premier_league.png";
import tableau from "../../images/tableau.png";
import Cards, { ProjectDivider } from "../ProjectCards/Cards";

const BigWords = ({ children }) => {
  return (
    <Typography
      component="span"
      sx={{ fontWeight: 800, color: theme.palette.primary.text.body }}
    >
      {children}
    </Typography>
  );
};

export default function DataAnalysis() {
  const color = theme.palette.primary.text.body;
  return (
    <>
      <Box
        sx={{
          margin: {
            md: "2.5rem 2.5rem 1rem 2.5rem",
            xs: "1rem 0rem 1rem 0rem",
          },
          padding: { md: "0 1rem 0 1rem", xs: 0 },
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: {
              lg: "0 10rem 2.5rem 10rem",
              md: "0 5rem 2.5rem 5rem",
              sm: "0 2.5rem 2.5rem 2.5rem",
              xs: "0 1.5rem 2.5rem 1.5rem",
            },
          }}
        >
          <Typography color={color} lineHeight={2}>
            I have always had a passion for{" "}
            <BigWords>data-driven decision making</BigWords>. As an Economics
            undergrad, I often{" "}
            <BigWords>explored, cleaned, and visualized</BigWords> large data
            sets in order to draw effective conclusions about topics such as
            economic goals and health trends. Some studies I have done are:
          </Typography>
        </Box>
        <Box sx={{ transform: { xs: "translateX(-40px)" } }}>
          <ProjectDivider contents="College Papers" />
        </Box>
        <Grid
          mt="2.5rem"
          mb="2.5rem"
          spacing={1}
          container
          lg={12}
          md={12}
          sm={12}
          xs={12}
          alignItems="stretch"
        >
          {ResearchProjects.map((project) => (
            <Grid sx={{ display: "flex" }} item lg={6} md={12} sm={12} xs={12}>
              <ResearchCard
                title={project.title}
                desc={project.description}
                tools={project.tags}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ transform: { xs: "translateX(-40px)" } }}>
          <ProjectDivider contents="Projects" />
        </Box>
        <Grid container spacing={1} p={0}>
          <Cards
            key={4}
            timing={1}
            heading="Publication Source Lineage Provider"
            desc="Developed, tested, and deployed code for a citation source lineage tracking application. Visualize citation network influencing source article using web scraper, release dates, and author information. Includes sentiment analysis and text classification capabilities."
            stack={[
              "Python",
              "Neo4j",
              "Node",
              "JavaScript",
              "Prometheus",
              "REST API",
              "Grafana",
            ]}
            src={source_lineage}
          />
          <Cards
            key={6}
            timing={3}
            heading="Predictive Modeling for Soccer Season Outcomes"
            desc="Evaluated machine learning algorithm and performance ultimately opting for Random Forest and Linear Regression due to versatility and predictive accuracy. Achieved 60% accuracy for entirety of 2021 Barclay Premier League season. Utilized Python for scripting. Tuned hyperparameters using Bayesian optimization."
            stack={["ML", "Java", "Kotlin", "JUnit", "APIs"]}
            src={premier}
          />
          <Cards
            key={3}
            timing={6}
            heading="SQL Data Exploration"
            desc="Data exploration, cleaning, and visualization using NVSS Heart Disease data from the state of NY (2021)"
            stack={["MS SQL Server", "Microsoft Excel", "Tableau"]}
            src={tableau}
          />
        </Grid>
      </Box>
    </>
  );
}

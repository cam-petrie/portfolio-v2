import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { ProjectCard } from "./Cards";
import ArticleIcon from "@mui/icons-material/Article";
import { theme } from "../../App";

export default function ResearchCard() {
  const [hover, setHovered] = React.useState(false);
  return (
    <>
      <Grid item md={6} sm={12} xs={12}>
        <ProjectCard
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{ padding: "2.5rem", flexDirection: "column", display: "flex" }}
        >
          <Box>
            <ArticleIcon
              sx={{
                color: hover
                  ? theme.palette.primary.highlight
                  : theme.palette.primary.text,
              }}
              fontSize="large"
            />
          </Box>
          <Typography
            gutterBottom
            color={
              hover
                ? theme.palette.primary.highlight
                : theme.palette.primary.text
            }
            sx={{ fontWeight: 600, fontSize: "1.25rem" }}
          >
            Sustainable Development Goals (SDG) in Mexico
          </Typography>
          <Typography sx={{ fontWeight: 200, fontSize: "0.85rem" }}>
            Examined Mexico's Economic growth within the context of UN's SDG for
            Latin America. Performed competitive analysis of Mexican life
            expectancy, dropout rates, and enrollment in tertiary education with
            regards to its regional counterparts and long-term statistics.
            Proposed categories for use of Sovereign Sustainable Goals Bond in
            the interest of increased national growth in the future.
          </Typography>
        </ProjectCard>
      </Grid>
    </>
  );
}

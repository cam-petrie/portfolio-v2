import * as React from "react";
import { Typography, Box } from "@mui/material";
import { ProjectCard } from "./Cards";
import ArticleIcon from "@mui/icons-material/Article";
import { theme } from "../../App";

export default function ResearchCard(props) {
  const [hover, setHovered] = React.useState(false);
  let title = props.title;
  let description = props.desc;
  return (
    <>
      <ProjectCard
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          padding: "2.5rem",
          flexDirection: "column",
          display: "flex",
        }}
        elevation={hover ? 3 : 0}
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
            hover ? theme.palette.primary.highlight : theme.palette.primary.text
          }
          sx={{ fontWeight: 600, fontSize: "1.25rem" }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontWeight: 200, fontSize: "0.85rem" }}>
          {description}
        </Typography>
      </ProjectCard>
    </>
  );
}

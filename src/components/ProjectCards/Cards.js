import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";

const ProjectCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.text,
  margin: "1rem 5rem 1rem 5rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:hover .heading": {
    color: theme.palette.primary.highlight,
  },
}));

const Utils = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.light,
  padding: "0.5rem 1rem 0.5rem 1rem",
  marginRight: "1rem",
  borderRadius: "8px",
}));

// function Utils(tool) {
//   console.log(tool.tool);
//   return (
//     <>
//       <Box >
//         <Typography variant="subtitle1">{tool.tool}</Typography>
//       </Box>
//     </>
//   );
// }

export default function Cards(props) {
  const [hovered, setHovered] = React.useState();
  // props = {heading, desc, stack, link};
  console.log(props.stack);
  return (
    <ProjectCard
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      elevation={hovered ? 5 : 0}
    >
      <CardContent>
        <Typography className="heading" variant="h5">
          {props.heading}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body1">{props.desc}</Typography>
      </CardContent>
      <CardContent sx={{ display: "flex" }}>
        {props.stack.map((tool, i) => (
          <Utils>
            <Typography fontSize={12} textTransform="uppercase" color="white">
              {tool}
            </Typography>
          </Utils>
        ))}
      </CardContent>
    </ProjectCard>
  );
}

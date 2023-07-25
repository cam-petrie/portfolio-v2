import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import styled from "@emotion/styled";

const ProjectCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.text,
  margin: "1rem 7.5rem 1rem 7.5rem",
  textTransform: "none",
  display: "flex",
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
      <Box>
        <CardContent>
          <Typography className="heading" variant="h6">
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
      </Box>
      <CardMedia
        sx={{
          alignItems: "start",
          right: 0,
          display: "flex",
          marginLeft: "auto",
        }}
      >
        <img
          style={{
            borderRadius: "8px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            height: "100px",
            width: "150px",
          }}
          src={props.src}
          alt="/"
        />
      </CardMedia>
    </ProjectCard>
  );
}

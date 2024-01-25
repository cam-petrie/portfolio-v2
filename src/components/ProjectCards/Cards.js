import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "../../App";

export const ProjectCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.text.heading,
  textTransform: "none",
  borderRadius: "8px",
  display: "flex",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  "&:hover .heading": {
    color: theme.palette.primary.highlight,
  },
}));
const Utils = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.tint,
  color: theme.palette.primary.light,
  padding: "0.5rem 1rem 0.5rem 1rem",
  margin: "0.25rem",
  borderRadius: "8px",
}));

export default React.forwardRef(function Cards(props, ref) {
  const [hovered, setHovered] = React.useState();
  return (
    <motion.div
      style={{ zIndex: 0 }}
      key={props.key}
      initial={{ scale: "90%" }}
      animate={{ scale: "100%" }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.75,
        delay: props.timing * 0.1,
        type: "spring",
        bounce: 0.25,
      }}
    >
      <ProjectCard
        ref={ref}
        sx={{
          margin: {
            cards: "0rem 7.5rem 1rem 5rem",
            md: "1rem 1rem 1rem 0rem",
            xs: "1rem 0rem 1rem 0rem",
          },
          padding: { cards: "0 1rem 0 0", md: 0, xs: 0 },
          flexDirection: { cards: "initial", md: "column", xs: "column" },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        elevation={hovered ? 3 : 0}
      >
        <Box>
          <CardContent sx={{ mb: 0, pb: 0 }}>
            <Typography className="heading" fontWeight={500} variant="h6">
              {props.heading}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              color={theme.palette.primary.text.body}
              fontWeight={100}
              variant="body2"
            >
              {props.desc}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
            {props.stack.map((tool, i) => (
              <Utils key={i}>
                <Typography
                  fontSize={12}
                  fontWeight={600}
                  textTransform="uppercase"
                  color={
                    hovered
                      ? theme.palette.primary.highlight
                      : theme.palette.primary.text.heading
                  }
                >
                  {tool}
                </Typography>
              </Utils>
            ))}
          </CardContent>
        </Box>
        <CardMedia
          sx={{
            alignItems: { cards: "center", md: "start", xs: "start" },
            display: "flex",
            marginLeft: { cards: "auto", md: "1rem", xs: "0" },
            flexGrow: { cards: "none", md: 1 },
            justifyContent: { cards: "none", md: "flex-end" },
          }}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "8px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              maxWidth: { cards: "250px", md: "35vw", sm: "60vw", xs: "100%" },
              maxHeight: {
                cards: "150px",
                md: "30vh",
                sm: "40vh",
                xs: "100%",
              },
              height: { cards: "150px", md: "100%", xs: "100%" },
              width: { cards: "250px", md: "100%", xs: "100%" },
            }}
            src={props.src}
            alt="/"
          />
        </CardMedia>
      </ProjectCard>
    </motion.div>
  );
});

export const ProjectDivider = ({ contents }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          px: 5,
          mb: 2,
        }}
      >
        <Divider
          variant="middle"
          sx={{
            my: "1rem",
            flex: 1,
            bgcolor: theme.palette.primary.text.body,
            borderBottomWidth: 2,
          }}
        />
        <Typography
          sx={{
            mx: 1,
            color: theme.palette.primary.text.body,
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          {contents}
        </Typography>
        <Divider
          variant="middle"
          sx={{
            my: "1rem",
            flex: 1,
            bgcolor: theme.palette.primary.text.body,
            borderBottomWidth: 2,
          }}
        />
      </Box>
    </>
  );
};

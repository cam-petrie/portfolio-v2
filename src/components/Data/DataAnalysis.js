import * as React from "react";
import { Typography, Box, Grid, Divider } from "@mui/material";
import { CustomText } from "../Typographies/CustomText";
import { theme } from "../../App";
import ResearchCard from "../ProjectCards/ResearchCards";

const BigWords = ({ children }) => {
  return (
    <Typography
      component="span"
      sx={{ fontWeight: 600, color: theme.palette.primary.highlight }}
    >
      {children}
    </Typography>
  );
};

export default function DataAnalysis() {
  const color = theme.palette.primary.highlight;
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
          <Typography lineHeight={2}>
            I have always had a passion for{" "}
            <BigWords>data-driven decision making</BigWords>. As a university
            student, I often{" "}
            <BigWords>explored, cleaned, and visualized</BigWords> large data
            sets in order to draw effective conclusions about topics such as
            economic goals and health trends. Some studies I have done are:
          </Typography>
        </Box>
        <Divider
          textAlign="center"
          sx={{
            "&.MuiDivider-root": {
              "&::after": { borderTop: `1px solid ${color}` },
              "&::before": { borderTop: `1px solid ${color}` },
            },
          }}
        >
          <Typography color={color} fontSize="1.5rem">
            Selected Projects
          </Typography>
        </Divider>
        <Grid mt="2.5rem" spacing={1} container>
          <ResearchCard />
          <ResearchCard />
          <ResearchCard />
          <ResearchCard />
        </Grid>
      </Box>
    </>
  );
}

import * as React from "react";
import { TextField, Grid } from "@mui/material";
import styled from "@emotion/styled";

const borderWidth = "2px";

const CustomField = styled(TextField)(({ theme }) => ({
  borderBottom: "2px solid transparent !important",
  "& label": {
    color: theme.palette.primary.text,
    "&.Mui-focused": {
      color: theme.palette.primary.highlight,
    },
  },

  "& .MuiInputBase-root": {
    color: theme.palette.primary.text,
    backgroundColor: "transparent !important",
    borderBottom: "2px solid transparent !important",
    "&:before": {
      borderBottom: "none",
      transition: "none",
    },
    "&:hover:before": {
      borderBottom: "none !important",
    },
    "&:after": {
      display: "block",
      content: '""',
      borderBottom: `2px solid ${theme.palette.primary.highlight}`,
      width: "100%",
      transform: "scaleX(0.85)",
      transition: "transform 250ms ease-in-out",
      transformOrigin: "0% 50%",
    },
    "&:hover:after": {
      transform: "scaleX(1)",
    },
    "&.Mui-focused:after": {
      transform: "scaleX(1)",
    },
  },
}));

export const CustomTF = (props) => {
  return (
    <Grid item md={12} sm={12} xs={12}>
      <CustomField
        variant="filled"
        required
        fullWidth
        name="name"
        multiline
        InputProps={{ sx: { borderBottom: "transparent" } }}
        rows={props.rows}
        label={props.label}
        type={props.type}
      >
        {props.children}
      </CustomField>
    </Grid>
  );
};

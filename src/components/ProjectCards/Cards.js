import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from "@mui/material";

function Utils(tool) {
  console.log(tool.tool);
  return (
    <>
      <Box>
        <Typography color="black">{tool.tool}</Typography>
      </Box>
    </>
  );
}

export default function Cards(props) {
  // props = {heading, desc, stack, link};
  console.log(props.stack);
  return (
    <Card>
      <CardContent>
        <Typography>{props.heading}</Typography>
      </CardContent>
      <CardContent>
        <Typography>{props.desc}</Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        {props.stack.map((tool, i) => (
          <Utils tool={tool} />
        ))}
      </CardContent>
    </Card>
  );
}

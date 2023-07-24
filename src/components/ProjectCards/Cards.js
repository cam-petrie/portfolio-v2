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
  return (
    <>
      <Box>
        <Typography>{tool}</Typography>
      </Box>
    </>
  );
}

export default function Cards(props) {
  // props = {heading, desc, stack, link};
  let myStack = [...props.stack];
  return (
    <Card>
      <CardHeader>{props.heading}</CardHeader>
      <CardContent>
        <Typography>{props.desc}</Typography>
      </CardContent>
      <CardActionArea>
        {myStack.map((tool, i) => (
          <Utils stack={tool} />
        ))}
      </CardActionArea>
    </Card>
  );
}

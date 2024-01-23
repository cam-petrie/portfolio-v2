import * as React from "react";
import { Box, Grid } from "@mui/material";
import { CustomTF } from "./CustomTextField";
import { CustomButton } from "../Buttons/LandingButton";
// import emailjs from "emailjs-com";

// import AlertDialog from "./confirmation";

const Form = ({ theme }) => {
  // const [hover, setHovered] = React.useState();
  // const [open, setOpen] = React.useState(false);
  // console.log(process.env.NEXT_PUBLIC_SERVICE_ID);
  //state for submission notification
  // const form = React.useRef();
  // referencing form current values
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   emailjs
  //     .sendForm(
  //       `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
  //       `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
  //       form.current,
  //       `${process.env.NEXT_PUBLIC_KEY}`
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         console.log("👋 Thanks for visiting");
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   setOpen(true);
  //   e.target.reset();
  // };
  // email form submission handler
  return (
    <Box
      sx={{
        width: "100%%",
        height: "fit-content",
        display: "flex",
        paddingBottom: "2.5rem",
      }}
    >
      <form style={{ zIndex: "5" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          display="flex"
          spacing={1}
          paddingBottom="2.5rem"
        >
          <CustomTF label="Name" type="name" name="name" />
          <CustomTF label="Email" type="email" name="email" />
          <CustomTF
            multilined={true}
            rows={5}
            label="Message"
            type="text"
            name="message"
          />
        </Grid>
        <CustomButton fontSize="1.5rem" type="submit">
          Send Message
        </CustomButton>
      </form>
    </Box>
  );
};

export default Form;

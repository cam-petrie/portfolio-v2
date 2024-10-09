import * as React from "react";
import { Box, Grid, Backdrop, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CustomTF } from "./CustomTextField";
import { CustomButton } from "../Buttons/LandingButton";
import emailjs from "@emailjs/browser";

const Form = ({ theme }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeBackdrop = () => {
    setOpenBackdrop(false);
    setShowSuccess(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setOpenBackdrop(true); // Show the backdrop immediately while processing

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setShowSuccess(true); // Display the checkmark and success message
          setTimeout(closeBackdrop, 3000); // Automatically close after 3 seconds
        },
        () => {
          alert('An error occurred while sending your message. Please try again.');
          closeBackdrop();
        }
      );

    e.target.reset();
    setFormData({ name: '', email: '', message: '' }); // Reset form data
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        paddingBottom: "2.5rem",
      }}
    >
      <form onSubmit={sendEmail} style={{ zIndex: "5" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          display="flex"
          spacing={1}
          paddingBottom="2.5rem"
        >
          <CustomTF
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <CustomTF
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <CustomTF
            multilined={true}
            rows={5}
            label="Message"
            type="text"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </Grid>
        <CustomButton fontSize="1.5rem" type="submit">
          Send Message
        </CustomButton>
      </form>

      {/* Backdrop with success message */}
      <Backdrop
        sx={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        {showSuccess ? (
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: 'white' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Thanks for your message! I'll get back to you as soon as possible.
            </Typography>
          </Box>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Backdrop>
    </Box>
  );
};

export default Form;

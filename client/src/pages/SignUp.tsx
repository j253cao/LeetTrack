import { Box, Fade } from "@mui/material";
import React from "react";

import SignUpForm from "../components/SignUpForm";

const pageStyles = {
  container: {
    "background": "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    "minHeight": "100vh",
    "padding": 0,
    "paddingInline": "15%",
    "paddingTop": 5,
    "paddingBottom": 5,
    "overflowY": "auto",
    "position": "relative",
    "&::before": {
      content: '""',
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      zIndex: -1,
    },
  },
};

export default function SignUp() {
  return (
    <Fade timeout={1000} in={true}>
      <Box sx={pageStyles.container}>
        <SignUpForm />
      </Box>
    </Fade>
  );
}

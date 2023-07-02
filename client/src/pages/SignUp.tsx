import {Grid} from "@mui/material";
import React from "react";

import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <SignUpForm />
    </Grid>
  );
}

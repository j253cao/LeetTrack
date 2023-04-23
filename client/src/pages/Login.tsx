import { Box, Grid } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <LoginForm />
    </Grid>
  );
}

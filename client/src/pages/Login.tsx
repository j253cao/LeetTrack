import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { authQueries } from "../queries/authQueries";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };
  useEffect(() => {
    const checkLogin = async () => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        const response = await authQueries.verifyUser(jwt!);
        if (response) handleNavigate("home");
      }
    };
    checkLogin();
  }, []);
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
      <LoginForm />
    </Grid>
  );
}

import { Box, Fade } from "@mui/material";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { authQueries } from "../queries/authQueries";
import { useNavigate } from "react-router-dom";

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

export default function Login() {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };
  useEffect(() => {
    const checkLogin = async () => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        const response = await authQueries.verifyUser(jwt);

        if (response.success) {
          localStorage.setItem("token", response.token);
          handleNavigate("home/dashboard");
        }
      }
    };
    checkLogin();
  }, []);
  return (
    <Fade timeout={1000} in={true}>
      <Box sx={pageStyles.container}>
        <LoginForm />
      </Box>
    </Fade>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import { styles } from "../common/styles";

export default function NavBar() {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ background: "white", color: "black", boxShadow: "none", paddingInline: "15%" }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Leet Track
          </Typography>
          <Button sx={{ marginRight: 2 }} variant="text" size="large" onClick={() => handleNavigate("login")} color="inherit">
            login
          </Button>
          <Button variant="contained" sx={{ ...styles.containedButton }} size="medium" onClick={() => handleNavigate("sign-up")} color="primary">
            sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

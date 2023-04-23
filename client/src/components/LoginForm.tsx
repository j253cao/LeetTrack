import { Box, Button, Card, CardContent, CardHeader, Checkbox, Link, TextField, Typography, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";

import { styles } from "../common/styles";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  ...styles.containedButton,
  marginLeft: "auto",
  "&:hover": {
    backgroundColor: "#565656",
  },
};

export default function LoginForm() {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card sx={{ flexDirection: "column", alignItems: "center", width: 1 / 5 }}>
      <CardHeader title="Login" />
      <CardContent>
        <TextField inputMode="email" fullWidth size="medium" required id="outlined-required" label="Email Required" variant="outlined" />
      </CardContent>
      <CardContent>
        <TextField fullWidth size="medium" required id="outlined-password-input-required" label="Password Required" type={showPassword ? "text" : "password"} />
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox onClick={() => setShowPassword(!showPassword)} size="small" color="default" sx={{ padding: 0, marginRight: 1 }} />
        <Typography fontSize={14}>Show password</Typography>
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => handleNavigate("sign-up")} variant="text" size="small">
          Create Account
        </Button>
        <Button variant="text" size="medium" sx={buttonStyle} color="primary">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}

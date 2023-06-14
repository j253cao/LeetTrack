import { Alert, Backdrop, Button, Card, CardContent, CardHeader, Checkbox, CircularProgress, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styles } from "../common/styles";
import { authQueries } from "../queries/authQueries";

const buttonStyle = {
  ...styles.containedButtonBlack,
  marginLeft: "auto",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(true);
  const [validLoginSnackbar, setValidLoginSnackbar] = useState<[boolean, string]>([false, ""]);

  const [showPassword, setShowPassword] = useState(false);

  const [signUpSuccess, setSignUpSuccess] = useState<boolean | undefined>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signUpSuccess === undefined) {
      setSignUpSuccess(location.state?.signUpSuccess);
    }
  }, [location]);

  const handleLogin = async () => {
    setLoading(true);
    const response = await authQueries.loginUser(email, password);
    setLoading(false);
    if (!response) {
      setValidLogin(false);
      setValidLoginSnackbar([true, "Server Error"]);
    }

    if (response.success) {
      localStorage.setItem("token", response.token!);

      handleNavigate("home");
      setValidLogin(response.success);
    } else {
      setValidLogin(false);
      setValidLoginSnackbar([true, "Invalid email or passowrd"]);
    }
  };

  return (
    <Card sx={{ flexDirection: "column", alignItems: "center", width: 1 / 5 }}>
      <CardHeader title="Login" />
      <CardContent>
        <TextField
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          error={!validLogin}
          inputMode="email"
          fullWidth
          size="medium"
          required
          id="outlined-required"
          label="Email Required"
          variant="outlined"
        />
      </CardContent>
      <CardContent>
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          error={!validLogin}
          fullWidth
          size="medium"
          required
          id="outlined-password-input-required"
          label="Password Required"
          type={showPassword ? "text" : "password"}
        />
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox onClick={() => setShowPassword(!showPassword)} size="small" color="default" sx={{ padding: 0, marginRight: 1 }} />
        <Typography fontSize={14}>Show password</Typography>
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => handleNavigate("sign-up")} variant="text" size="small">
          Create Account
        </Button>
        <Button onClick={handleLogin} variant="text" size="medium" sx={buttonStyle} color="primary">
          Login
        </Button>
      </CardContent>
      <Snackbar onClose={() => setSignUpSuccess(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={signUpSuccess} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Successfully sign up!
        </Alert>
      </Snackbar>
      <Snackbar onClose={() => setValidLoginSnackbar([false, ""])} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={validLoginSnackbar[0]} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {validLoginSnackbar[1]}
        </Alert>
      </Snackbar>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}

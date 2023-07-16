import {
  Alert,
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styles } from "../common/styles";
import { validateEmail, validatePassword } from "../common/validation";
import { authQueries } from "../queries/authQueries";

const buttonStyle = {
  ...styles.containedButtonBlack,
  marginLeft: "auto",
};

type NavigateState = {
  state: { signUpSuccess?: boolean };
};

interface SignUpSnackBarStates {
  duplicateError: boolean;
  serverError: boolean;
  passwordValidation: boolean;
}

export default function SignUpForm() {
  const navigate = useNavigate();

  const handleNavigate = (route: string, state?: NavigateState) => {
    navigate("/" + route, state);
  };

  const [firstSubmit, setFirstSubmit] = useState(true);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState<boolean | null>(null);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [snackbars, setSnackbars] = useState<SignUpSnackBarStates>({
    duplicateError: false,
    serverError: false,
    passwordValidation: false,
  });

  const handleCreateAccount = async () => {
    setValidEmail(validateEmail(email));
    setValidPassword(validatePassword(password));
    setFirstSubmit(false);
    if (validateEmail(email) && validatePassword(password)) {
      try {
        setLoading(true);

        const response = await authQueries.createUser(email, password);
        setLoading(false);

        if (response.success) {
          handleNavigate("login", {
            state: { signUpSuccess: response.success },
          });
          setSnackbars({
            duplicateError: false,
            serverError: false,
            passwordValidation: false,
          });
        } else {
          setSnackbars({
            serverError: false,
            passwordValidation: false,
            duplicateError: true,
          });
        }
      } catch (error) {
        setLoading(false);
        setSnackbars({
          duplicateError: false,
          passwordValidation: false,
          serverError: true,
        });
      }
    }
    if (!validatePassword(password)) {
      setSnackbars({
        duplicateError: false,
        serverError: false,
        passwordValidation: true,
      });
    }
  };

  return (
    <Card sx={{ flexDirection: "column", alignItems: "center", width: 1 / 5 }}>
      <CardHeader title="Create Account" />
      <CardContent>
        <TextField
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          error={!validEmail && !firstSubmit}
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
          error={!validPassword && !firstSubmit}
          fullWidth
          size="medium"
          required
          id="outlined-password-input-required"
          label="Password Required"
          type={showPassword ? "text" : "password"}
        />
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          onClick={() => setShowPassword(!showPassword)}
          size="small"
          color="default"
          sx={{ padding: 0, marginRight: 1 }}
        />
        <Typography fontSize={14}>Show password</Typography>
      </CardContent>

      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => handleNavigate("login")}
          variant="text"
          size="small"
        >
          Login
        </Button>
        <Button
          onClick={handleCreateAccount}
          variant="text"
          size="medium"
          sx={buttonStyle}
          color="primary"
        >
          Create Account
        </Button>
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbars.passwordValidation}
        onClose={() =>
          setSnackbars({ ...snackbars, passwordValidation: false })
        }
        autoHideDuration={3000}
        message="Password must be 8-24 characters long. Must include one letter (a-z, A-Z) and one number (0-9)."
      />
      <Snackbar
        onClose={() => setSnackbars({ ...snackbars, duplicateError: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbars.duplicateError}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Account with this email already exists!
        </Alert>
      </Snackbar>
      <Snackbar
        onClose={() => setSnackbars({ ...snackbars, serverError: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbars.serverError}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          There was an error processing your request!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}

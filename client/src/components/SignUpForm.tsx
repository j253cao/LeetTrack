import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { validateEmail, validatePassword } from "../common/validation";
import { authQueries } from "../queries/authQueries";

const formStyles = {
  container: {
    "width": "100%",
    "maxWidth": "450px",
    "margin": "0 auto",
    "padding": 4,
    "background": "rgba(255, 255, 255, 0.95)",
    "backdropFilter": "blur(10px)",
    "borderRadius": 3,
    "boxShadow": "0px 8px 32px rgba(44, 123, 229, 0.1)",
    "border": "1px solid rgba(44, 123, 229, 0.1)",
    "position": "relative",
    "overflow": "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "6px",
      background: "linear-gradient(90deg, #2c7be5, #17bcde, #2c7be5)",
      backgroundSize: "200% 100%",
      animation: "gradientMove 3s linear infinite",
    },
  },
  header: {
    textAlign: "center",
    marginBottom: 4,
    marginTop: 2,
  },
  logo: {
    fontSize: "3.5em",
    fontWeight: 700,
    background: "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 1,
    letterSpacing: "-1px",
  },
  title: {
    fontSize: "2em",
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 1,
  },
  subtitle: {
    color: "#626262",
    fontSize: "1.1em",
    marginBottom: 3,
    lineHeight: 1.5,
  },
  input: {
    "marginBottom": 2,
    "& .MuiOutlinedInput-root": {
      "borderRadius": 2,
      "&:hover fieldset": {
        borderColor: "#2c7be5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2c7be5",
      },
    },
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 2,
  },
  checkbox: {
    padding: 0,
    marginRight: 1,
    color: "#2c7be5",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
  },
  createButton: {
    "background": "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
    "color": "white",
    "padding": "12px 36px",
    "borderRadius": "12px",
    "fontSize": "1.1em",
    "textTransform": "none",
    "boxShadow": "0px 4px 12px rgba(44, 123, 229, 0.2)",
    "&:hover": {
      background: "linear-gradient(45deg, #1a6fd4 30%, #0fa8c7 90%)",
      transform: "translateY(-2px)",
      boxShadow: "0px 8px 24px rgba(44, 123, 229, 0.3)",
    },
  },
  loginButton: {
    "color": "#2c7be5",
    "textTransform": "none",
    "fontSize": "1em",
    "&:hover": {
      background: "none",
      textDecoration: "underline",
    },
  },
  requirements: {
    marginTop: 2,
    padding: 2,
    background: "rgba(44, 123, 229, 0.05)",
    borderRadius: 2,
    border: "1px solid rgba(44, 123, 229, 0.1)",
  },
  requirementText: {
    fontSize: "0.9em",
    color: "#626262",
    marginBottom: 0.5,
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
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
    <Box sx={formStyles.container}>
      <Box sx={formStyles.header}>
        <Typography sx={formStyles.logo}>LeetTrack</Typography>
        <Typography sx={formStyles.title}>Create Account</Typography>
        <Typography sx={formStyles.subtitle}>
          Join our community of developers and start tracking your coding
          progress
        </Typography>
      </Box>

      <TextField
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        error={!validEmail && !firstSubmit}
        inputMode="email"
        fullWidth
        size="medium"
        required
        label="Email"
        variant="outlined"
        sx={formStyles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FiMail color="#626262" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        onChange={(event) => setPassword(event.target.value)}
        error={!validPassword && !firstSubmit}
        fullWidth
        size="medium"
        required
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        sx={formStyles.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FiLock color="#626262" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={formStyles.checkboxContainer}>
        <Checkbox
          onClick={() => setShowPassword(!showPassword)}
          size="small"
          sx={formStyles.checkbox}
        />
        <Typography fontSize={14} color="#626262">
          Show password
        </Typography>
      </Box>

      <Box sx={formStyles.requirements}>
        <Typography sx={formStyles.requirementText}>
          Password requirements:
        </Typography>
        <Typography sx={formStyles.requirementText}>
          • 8-24 characters long
        </Typography>
        <Typography sx={formStyles.requirementText}>
          • Must include one letter (a-z, A-Z)
        </Typography>
        <Typography sx={formStyles.requirementText}>
          • Must include one number (0-9)
        </Typography>
      </Box>

      <Box sx={formStyles.buttonContainer}>
        <Button
          onClick={() => handleNavigate("login")}
          variant="text"
          sx={formStyles.loginButton}
        >
          Sign In
        </Button>
        <Button
          onClick={handleCreateAccount}
          variant="contained"
          sx={formStyles.createButton}
        >
          Create Account
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbars.passwordValidation}
        onClose={() =>
          setSnackbars({ ...snackbars, passwordValidation: false })
        }
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Password must be 8-24 characters long. Must include one letter (a-z,
          A-Z) and one number (0-9).
        </Alert>
      </Snackbar>

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
    </Box>
  );
}

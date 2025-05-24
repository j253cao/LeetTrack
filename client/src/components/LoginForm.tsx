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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "../common/styles";
import { authQueries } from "../queries/authQueries";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";

const formStyles = {
  container: {
    width: "100%",
    maxWidth: "450px",
    margin: "0 auto",
    padding: 4,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: 3,
    boxShadow: "0px 8px 32px rgba(44, 123, 229, 0.1)",
    border: "1px solid rgba(44, 123, 229, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: 4,
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
  loginButton: {
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
  signUpButton: {
    "color": "#2c7be5",
    "textTransform": "none",
    "fontSize": "1em",
    "&:hover": {
      background: "none",
      textDecoration: "underline",
    },
  },
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
  const [validLoginSnackbar, setValidLoginSnackbar] = useState<
    [boolean, string]
  >([false, ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signUpSuccess === undefined) {
      setSignUpSuccess(location.state?.signUpSuccess);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!email || !password) {
      setValidLogin(false);
      setValidLoginSnackbar([true, "Please enter both email and password"]);
      return;
    }

    setLoading(true);
    const response = await authQueries.loginUser(email, password);
    setLoading(false);
    if (!response) {
      setValidLogin(false);
      setValidLoginSnackbar([true, "Server Error"]);
    }

    if (response.success) {
      localStorage.setItem("token", response.token!);
      handleNavigate("home/dashboard");
      setValidLogin(response.success);
    } else {
      setValidLogin(false);
      setValidLoginSnackbar([true, "Invalid email or password"]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box sx={formStyles.container}>
      <Box sx={formStyles.header}>
        <Typography sx={formStyles.logo}>LeetTrack</Typography>
        <Typography sx={formStyles.title}>Welcome Back</Typography>
        <Typography sx={formStyles.subtitle}>
          Sign in to continue your coding journey and track your progress
        </Typography>
      </Box>

      <TextField
        onChange={(event) => setEmail(event.target.value)}
        onKeyPress={handleKeyPress}
        error={!validLogin}
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
        onKeyPress={handleKeyPress}
        error={!validLogin}
        fullWidth
        size="medium"
        required
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        sx={formStyles.input}
        InputProps={{
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

      <Box sx={formStyles.buttonContainer}>
        <Button
          onClick={() => handleNavigate("sign-up")}
          variant="text"
          sx={formStyles.signUpButton}
        >
          Create Account
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          sx={formStyles.loginButton}
        >
          Sign In
        </Button>
      </Box>

      <Snackbar
        onClose={() => setSignUpSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={signUpSuccess}
        autoHideDuration={3000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Successfully signed up!
        </Alert>
      </Snackbar>

      <Snackbar
        onClose={() => setValidLoginSnackbar([false, ""])}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={validLoginSnackbar[0]}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {validLoginSnackbar[1]}
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

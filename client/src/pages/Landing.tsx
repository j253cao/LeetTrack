import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { colors, styles } from "../common/styles";
import { SlNote } from "react-icons/sl";
import { GoGraph } from "react-icons/go";
import { TbStairsUp } from "react-icons/tb";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authQueries } from "../queries/authQueries";

const pageStyles = {
  container: {
    background: colors.background,
    height: "100vh",
    padding: 0,
    paddingInline: "15%",
    paddingTop: 5,

    overflowY: "none",
  },
  headerContainer: {
    paddingBottom: 2,
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  smallSquare: {
    "width": "25%",
    "background": colors.white,
    "borderRadius": 2,
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "padding": 2,
    "paddingTop": 4,
    "paddingBottom": 4,
    "&:hover": {
      outline: `solid 2px ${colors.black}`,
    },
    "boxShadow": "0px 0px 29px 2px rgba(222,222,222,0.85)",
  },
  pageButtons: {
    "color": colors.defaultFont,
    "&:hover": { background: colors.white, color: colors.black },
    "borderRadius": 0,
    "minHeight": "100%",
    "padding": 0,
    "fontWeight": "bold",
    "fontSize": "0.8em",
  },
};

const fieldMap = new Map();
fieldMap.set("status", 1);
fieldMap.set("title", 3);
fieldMap.set("tags", 4);
fieldMap.set("difficulty", 2);
fieldMap.set("last updated", 2);

export default function Landing() {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(route);
  };
  const checkLogin = async () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const response = await authQueries.verifyUser(jwt);

      if (response.success) {
        localStorage.setItem("token", response.token);

        handleNavigate("home/dashboard");
      }
    } else {
      handleNavigate("/login");
    }
  };
  return (
    <Fade timeout={1000} in={true}>
      <Box sx={pageStyles.container}>
        <Box sx={pageStyles.headerContainer}>
          <Typography variant="h5">LeetTrack</Typography>
          <Button
            sx={{
              ...styles.defaultContainedButton,
              marginLeft: "auto",
              fontSize: "1em",
            }}
            onClick={checkLogin}
          >
            Sign In
          </Button>
        </Box>
        <Box
          id="body1"
          gap={3}
          sx={{
            ...pageStyles.bodyContainer,
            marginBottom: 10,
          }}
        >
          <Box>
            <Typography gap={1} display={"flex"} variant="h4">
              <Typography variant="h4" fontWeight={600}>
                Organize{" "}
              </Typography>
              and{" "}
              <Typography variant="h4" fontWeight={600}>
                Optimize
              </Typography>{" "}
              Algorithms Practice
            </Typography>
          </Box>
          <Box marginBottom={3} width={"60%"}>
            <Typography
              fontSize={"1em"}
              fontWeight={600}
              color={colors.defaultFont}
              textAlign={"center"}
            >
              LeetTrack is a powerful tool designed to streamline and enhance
              your LeetCode practice experience. With LeetTrack, you can
              efficiently track your progress, manage your problem-solving
              journey, and boost your skills in coding interviews.
            </Typography>
          </Box>

          <Box marginBottom={10}>
            <Button
              sx={{
                ...styles.defaultContainedButton,
                width: 200,
                fontSize: "1.2em",
              }}
              onClick={() => handleNavigate("/sign-up")}
            >
              Sign Up Here
            </Button>
          </Box>

          <Box justifyContent={"space-evenly"} display={"flex"} width={"100%"}>
            <Box
              gap={2}
              sx={{
                ...pageStyles.smallSquare,
                "&:hover": {
                  outline: `solid 2px #17bcde`,
                },
              }}
            >
              <SlNote color="#17bcde" size={60} />
              <Typography fontSize={"1.8em"}>Document</Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
              >
                Mark problems as solved and keep track of your submission
                history.
              </Typography>
            </Box>
            <Box
              gap={2}
              sx={{
                ...pageStyles.smallSquare,
                "&:hover": {
                  outline: `solid 2px #de8417`,
                  transition: "opacity 1s",
                },
              }}
            >
              <GoGraph color="#de8417" size={60} />
              <Typography fontSize={"1.8em"}>Analyze</Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
              >
                Monitor your progress across different difficulty levels and
                problem categories.
              </Typography>
            </Box>
            <Box
              gap={2}
              sx={{
                ...pageStyles.smallSquare,
                "&:hover": {
                  outline: `solid 2px #1767de`,
                },
              }}
            >
              <TbStairsUp color="#1767de" size={60} />
              <Typography fontSize={"1.8em"}>Improve</Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
              >
                Leverage personalized data to enrich your studying experience.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

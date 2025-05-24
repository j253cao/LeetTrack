import React from "react";
import { Box, Button, Typography, Grid, Divider } from "@mui/material";
import { colors, styles } from "../common/styles";
import { SlNote } from "react-icons/sl";
import { GoGraph } from "react-icons/go";
import { TbStairsUp } from "react-icons/tb";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

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
  headerContainer: {
    paddingBottom: 2,
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  smallSquare: {
    "width": "25%",
    "background":
      "linear-gradient(135deg, rgba(44, 123, 229, 0.05) 0%, rgba(23, 188, 222, 0.05) 100%)",
    "borderRadius": 2,
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "padding": 3,
    "paddingTop": 4,
    "paddingBottom": 4,
    "transition": "all 0.3s ease-in-out",
    "position": "relative",
    "overflow": "hidden",
    "boxShadow": "0px 4px 20px rgba(44, 123, 229, 0.08)",
    "backdropFilter": "blur(10px)",
    "border": "1px solid rgba(44, 123, 229, 0.1)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0px 8px 24px rgba(44, 123, 229, 0.12)",
      background:
        "linear-gradient(135deg, rgba(44, 123, 229, 0.08) 0%, rgba(23, 188, 222, 0.08) 100%)",
    },
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
    handleNavigate("/login");
  };
  return (
    <Fade timeout={1000} in={true}>
      <Box sx={pageStyles.container}>
        <Box sx={pageStyles.headerContainer}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LeetTrack
          </Typography>
          <Button
            sx={{
              ...styles.defaultContainedButton,
              "marginLeft": "auto",
              "fontSize": "1em",
              "padding": "8px 24px",
              "borderRadius": "12px",
              "boxShadow": "0px 4px 12px rgba(44, 123, 229, 0.2)",
              "background": "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 12px 28px rgba(44, 123, 229, 0.4)",
                background: "linear-gradient(45deg, #1a6fd4 30%, #0fa8c7 90%)",
              },
            }}
            onClick={checkLogin}
          >
            Sign In
          </Button>
        </Box>

        {/* Hero Section */}
        <Box
          id="body1"
          gap={4}
          sx={{
            ...pageStyles.bodyContainer,
            marginBottom: 12,
          }}
        >
          <Box>
            <Typography
              gap={1}
              display={"flex"}
              variant="h3"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              <Typography variant="h3" fontWeight={700} color="#2c7be5">
                Organize{" "}
              </Typography>
              and{" "}
              <Typography variant="h3" fontWeight={700} color="#17bcde">
                Optimize
              </Typography>{" "}
              Algorithms Practice
            </Typography>
          </Box>
          <Box marginBottom={4} width={"60%"}>
            <Typography
              fontSize={"1.1em"}
              fontWeight={500}
              color={colors.defaultFont}
              textAlign={"center"}
              sx={{ lineHeight: 1.6 }}
            >
              LeetTrack is a powerful tool designed to streamline and enhance
              your LeetCode practice experience. With LeetTrack, you can
              efficiently track your progress, manage your problem-solving
              journey, and boost your skills in coding interviews.
            </Typography>
          </Box>

          <Box marginBottom={12}>
            <Button
              sx={{
                ...styles.defaultContainedButton,
                "width": 240,
                "fontSize": "1.2em",
                "padding": "12px 32px",
                "borderRadius": "12px",
                "boxShadow": "0px 8px 24px rgba(44, 123, 229, 0.3)",
                "transition": "all 0.3s ease",
                "background":
                  "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 12px 28px rgba(44, 123, 229, 0.4)",
                  background:
                    "linear-gradient(45deg, #1a6fd4 30%, #0fa8c7 90%)",
                },
              }}
              onClick={() => handleNavigate("/sign-up")}
            >
              Sign Up Here
            </Button>
          </Box>

          {/* Feature Cards */}
          <Box
            justifyContent={"space-evenly"}
            display={"flex"}
            width={"100%"}
            gap={4}
          >
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
              <Typography fontSize={"1.8em"} fontWeight={600} color="#17bcde">
                Document
              </Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
                color={colors.defaultFont}
                sx={{ lineHeight: 1.6 }}
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
                },
              }}
            >
              <GoGraph color="#de8417" size={60} />
              <Typography fontSize={"1.8em"} fontWeight={600} color="#de8417">
                Analyze
              </Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
                color={colors.defaultFont}
                sx={{ lineHeight: 1.6 }}
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
              <Typography fontSize={"1.8em"} fontWeight={600} color="#1767de">
                Improve
              </Typography>
              <Typography
                maxWidth={"75%"}
                fontSize={"0.9em"}
                textAlign={"center"}
                color={colors.defaultFont}
                sx={{ lineHeight: 1.6 }}
              >
                Leverage personalized data to enrich your studying experience.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={{ marginBottom: 12, width: "100%" }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} color="#2c7be5">
                  10K+
                </Typography>
                <Typography color={colors.defaultFont}>Active Users</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} color="#17bcde">
                  50K+
                </Typography>
                <Typography color={colors.defaultFont}>
                  Problems Tracked
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700} color="#de8417">
                  85%
                </Typography>
                <Typography color={colors.defaultFont}>Success Rate</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ marginBottom: 12, width: "100%" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ marginBottom: 6 }}
          >
            Why Choose LeetTrack?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Box
                sx={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": 2,
                  "background":
                    "linear-gradient(135deg, rgba(23, 188, 222, 0.05) 0%, rgba(44, 123, 229, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(23, 188, 222, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(23, 188, 222, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(23, 188, 222, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(23, 188, 222, 0.08) 0%, rgba(44, 123, 229, 0.08) 100%)",
                  },
                }}
              >
                <BsCheckCircle size={24} color="#17bcde" />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Structured Learning
                  </Typography>
                  <Typography color={colors.defaultFont}>
                    Follow a systematic approach to master algorithms and data
                    structures
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": 2,
                  "background":
                    "linear-gradient(135deg, rgba(222, 132, 23, 0.05) 0%, rgba(23, 103, 222, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(222, 132, 23, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(222, 132, 23, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(222, 132, 23, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(222, 132, 23, 0.08) 0%, rgba(23, 103, 222, 0.08) 100%)",
                  },
                }}
              >
                <FaUserFriends size={24} color="#de8417" />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Community Driven
                  </Typography>
                  <Typography color={colors.defaultFont}>
                    Learn from others' experiences and share your progress
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  "display": "flex",
                  "alignItems": "center",
                  "gap": 2,
                  "background":
                    "linear-gradient(135deg, rgba(23, 103, 222, 0.05) 0%, rgba(44, 123, 229, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(23, 103, 222, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(23, 103, 222, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(23, 103, 222, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(23, 103, 222, 0.08) 0%, rgba(44, 123, 229, 0.08) 100%)",
                  },
                }}
              >
                <MdSpeed size={24} color="#1767de" />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Efficient Practice
                  </Typography>
                  <Typography color={colors.defaultFont}>
                    Optimize your study time with smart problem recommendations
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ marginBottom: 12, width: "100%" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ marginBottom: 6 }}
          >
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Box
                sx={{
                  "background":
                    "linear-gradient(135deg, rgba(44, 123, 229, 0.05) 0%, rgba(23, 188, 222, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(44, 123, 229, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(44, 123, 229, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(44, 123, 229, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(44, 123, 229, 0.08) 0%, rgba(23, 188, 222, 0.08) 100%)",
                  },
                }}
              >
                <Typography
                  sx={{ fontStyle: "italic", marginBottom: 2 }}
                  color={colors.defaultFont}
                >
                  "LeetTrack helped me organize my LeetCode practice and land my
                  dream job at a top tech company. The progress tracking
                  features are invaluable!"
                </Typography>
                <Typography fontWeight={600}>Sarah Chen</Typography>
                <Typography fontSize="0.9em" color={colors.light}>
                  Software Engineer at Google
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  "background":
                    "linear-gradient(135deg, rgba(222, 132, 23, 0.05) 0%, rgba(23, 103, 222, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(222, 132, 23, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(222, 132, 23, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(222, 132, 23, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(222, 132, 23, 0.08) 0%, rgba(23, 103, 222, 0.08) 100%)",
                  },
                }}
              >
                <Typography
                  sx={{ fontStyle: "italic", marginBottom: 2 }}
                  color={colors.defaultFont}
                >
                  "The analytics features helped me identify my weak areas and
                  improve my problem-solving skills systematically. Highly
                  recommended!"
                </Typography>
                <Typography fontWeight={600}>Michael Rodriguez</Typography>
                <Typography fontSize="0.9em" color={colors.light}>
                  Full Stack Developer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  "background":
                    "linear-gradient(135deg, rgba(23, 103, 222, 0.05) 0%, rgba(44, 123, 229, 0.05) 100%)",
                  "padding": 3,
                  "borderRadius": 2,
                  "boxShadow": "0px 4px 20px rgba(23, 103, 222, 0.08)",
                  "backdropFilter": "blur(10px)",
                  "border": "1px solid rgba(23, 103, 222, 0.1)",
                  "transition": "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 24px rgba(23, 103, 222, 0.12)",
                    background:
                      "linear-gradient(135deg, rgba(23, 103, 222, 0.08) 0%, rgba(44, 123, 229, 0.08) 100%)",
                  },
                }}
              >
                <Typography
                  sx={{ fontStyle: "italic", marginBottom: 2 }}
                  color={colors.defaultFont}
                >
                  "As a coding bootcamp graduate, LeetTrack was crucial in
                  helping me prepare for technical interviews. The daily
                  problems feature is fantastic!"
                </Typography>
                <Typography fontWeight={600}>Emily Thompson</Typography>
                <Typography fontSize="0.9em" color={colors.light}>
                  Frontend Developer
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: "center",
            padding: 6,
            background: "linear-gradient(135deg, #2c7be5 0%, #17bcde 100%)",
            borderRadius: 4,
            marginBottom: 6,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="white"
            sx={{ marginBottom: 2 }}
          >
            Ready to Boost Your Coding Skills?
          </Typography>
          <Typography color="white" sx={{ marginBottom: 4, opacity: 0.9 }}>
            Join thousands of developers who are already improving their
            problem-solving skills with LeetTrack
          </Typography>
          <Button
            sx={{
              "background": "white",
              "color": "#2c7be5",
              "padding": "12px 32px",
              "fontSize": "1.1em",
              "fontWeight": 600,
              "borderRadius": "12px",
              "&:hover": {
                background: "#f8f9fa",
                transform: "translateY(-2px)",
              },
            }}
            onClick={() => handleNavigate("/sign-up")}
          >
            Get Started Now
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

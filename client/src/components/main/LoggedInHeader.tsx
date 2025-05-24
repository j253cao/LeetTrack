import { AppBar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../common/styles";
import { capitalizeFirst } from "../../common/functions";

const styles = {
  headerContainer: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(44, 123, 229, 0.1)",
    boxShadow: "0px 4px 12px rgba(44, 123, 229, 0.05)",
    height: 70,
    display: "flex",
    alignItems: "center",
  },
  contentContainer: {
    minHeight: "100%",
    display: "flex",
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageButtons: {
    "color": colors.defaultFont,
    "fontSize": "1.1em",
    "fontWeight": 500,
    "padding": "8px 16px",
    "borderRadius": "8px",
    "textTransform": "none",
    "minHeight": "100%",
    "marginRight": 2,
    "transition": "all 0.2s ease-in-out",
    "&:hover": {
      background: "rgba(44, 123, 229, 0.05)",
      color: "#2c7be5",
    },
  },
  logo: {
    fontSize: "1.8em",
    fontWeight: 700,
    background: "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
  },
  signOutButton: {
    "color": "#2c7be5",
    "fontSize": "1em",
    "fontWeight": 500,
    "padding": "8px 16px",
    "borderRadius": "8px",
    "textTransform": "none",
    "transition": "all 0.2s ease-in-out",
    "&:hover": {
      background: "rgba(44, 123, 229, 0.05)",
    },
  },
};

type HandleNavigate = (route: string) => void;

const pages = ["dashboard", "problems"];

export default function LoggedInHeader({
  handleNavigate,
  location,
}: {
  handleNavigate: HandleNavigate;
  location: string;
}) {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    handleNavigate("");
  };

  return (
    <AppBar position="static" sx={styles.headerContainer}>
      <Box id="content-container" sx={styles.contentContainer}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "40%",
            gap: 1,
          }}
        >
          {pages.map((page) => (
            <Button
              disableRipple
              onClick={() =>
                handleNavigate(
                  page === "dashboard" ? "home/dashboard" : "home/problems"
                )
              }
              key={page}
              sx={{
                ...styles.pageButtons,
                background:
                  location.slice(location.indexOf("/", 1) + 1) === page
                    ? "rgba(44, 123, 229, 0.1)"
                    : "transparent",
                color:
                  location.slice(location.indexOf("/", 1) + 1) === page
                    ? "#2c7be5"
                    : colors.defaultFont,
              }}
            >
              {capitalizeFirst(page)}
            </Button>
          ))}
        </Box>
        <Typography sx={styles.logo}>LeetTrack</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "40%",
          }}
        >
          <Button
            onClick={handleSignOut}
            disableRipple
            disableFocusRipple
            sx={styles.signOutButton}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}

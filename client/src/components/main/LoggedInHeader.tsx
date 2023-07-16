import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import { colors } from "../../common/styles";
import { capitalizeFirst } from "../../common/functions";

const styles = {
  headerContainer: {
    background: colors.white,
    borderBottom: "solid",
    borderWidth: 1,
    borderColor: colors.superLight,
    boxShadow: "none",
    height: 65,
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
    "&:hover": { background: colors.white, color: colors.black },
    "borderRadius": 0,
    "textTransform": "none",
    "minHeight": "100%",
    "marginRight": 2,
    "padding": 0,
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
                borderBottom:
                  location.slice(location.indexOf("/", 1) + 1) === page
                    ? { borderBottom: `solid ${colors.black} 1px` }
                    : {},
              }}
            >
              {capitalizeFirst(page)}
            </Button>
          ))}
        </Box>
        <Box sx={{ color: colors.black, alignContent: "center" }}>
          LeetTrack
        </Box>
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
            sx={styles.pageButtons}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}

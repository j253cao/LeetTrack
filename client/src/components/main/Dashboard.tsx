import { Box, Grid, Typography } from "@mui/material";
import React, { FunctionComponent, FunctionComponentElement } from "react";
import { colors } from "../../common/styles";
import { PiPencilSimpleLine, PiThumbsDown, PiThumbsUp } from "react-icons/pi";

type Icons = { [key: string]: any };

const styles = {
  container: {
    background: colors.white,
    border: `solid 1px ${colors.superLight}`,
    padding: 2,
    borderRadius: 2,
    height: 55,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const section1 = [
  "Total Problems",
  "Completed Problems",
  "In-Complete Problems",
];

const section2 = ["Recent Activity", "Difficulty", "Tags"];

const icons: Icons = {
  "Total Problems": <PiPencilSimpleLine style={{ marginLeft: "auto " }} />,
  "Completed Problems": <PiThumbsUp style={{ marginLeft: "auto " }} />,
  "In-Complete Problems": <PiThumbsDown style={{ marginLeft: "auto " }} />,
};

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      {section1.map((section) => (
        <Grid key={section} item xs={4}>
          <Box sx={styles.container}>
            <Typography
              sx={{
                color: colors.light,
                fontSize: "0.6em",
                fontWeight: "bold",
              }}
            >
              {section.toUpperCase()}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontWeight={600}>0</Typography>
              {icons[section]}
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={4}>
        <Box sx={styles.container}>
          <Typography
            sx={{
              color: colors.light,
              fontSize: "0.6em",
              fontWeight: "bold",
            }}
          >
            Recent Activity
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontWeight={600}>0</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

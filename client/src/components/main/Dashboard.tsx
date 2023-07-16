import { Box, Chip, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../common/styles";
import { PiPencilSimpleLine, PiThumbsDown, PiThumbsUp } from "react-icons/pi";
import { Problem, ProblemInfo } from "../../queries/problemQueries";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { formatRelativeTime } from "../../common/functions";
import DifficultyChart from "./charts/DifficultyChart";
import RecentActivity from "./charts/RecentActivity";

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

const section1: [
  "Total Problems",
  "Completed Problems",
  "In-Complete Problems"
] = ["Total Problems", "Completed Problems", "In-Complete Problems"];

const icons: Icons = {
  "Total Problems": (
    <PiPencilSimpleLine size={20} style={{ marginLeft: "auto " }} />
  ),
  "Completed Problems": (
    <PiThumbsUp size={20} style={{ marginLeft: "auto " }} />
  ),
  "In-Complete Problems": (
    <PiThumbsDown size={20} style={{ marginLeft: "auto " }} />
  ),
};

export default function Dashboard({
  dailyProblem,
  constantProblemsList,
}: {
  dailyProblem: ProblemInfo;
  constantProblemsList: Problem[];
}) {
  const section1Values = {
    "Total Problems": constantProblemsList.length,
    "Completed Problems": constantProblemsList.filter(
      (problem) => problem.status === "Complete"
    ).length,
    "In-Complete Problems": constantProblemsList.filter(
      (problem) => problem.status !== "Complete"
    ).length,
  };

  const getDailyUpdatedAt = () => {
    const updatedAt = constantProblemsList.find(
      (problem) => problem.problem.title === dailyProblem?.title
    )?.updatedAt;

    return formatRelativeTime(new Date(updatedAt!));
  };

  type DashboardData = {
    difficultyData: {
      Easy: number;
      Medium: number;
      Hard: number;
    };
    recentActivity: number[];
  };

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    difficultyData: { Easy: 0, Medium: 0, Hard: 0 },
    recentActivity: [],
  });

  useEffect(() => {
    const getDashboardData = () => {
      let data: DashboardData = {
        difficultyData: { Easy: 0, Medium: 0, Hard: 0 },
        recentActivity: Array(14).fill(0),
      };
      const todaysDate = new Date().getDate();
      constantProblemsList.forEach((problem) => {
        data.difficultyData[problem.problem.difficulty] += 1;
        const problemDate = new Date(problem.updatedAt).getDate();
        if (problemDate >= todaysDate - 13) {
          data.recentActivity[13 - (todaysDate - problemDate)]++;
        }
      });

      setDashboardData(data);
    };
    getDashboardData();
  }, [constantProblemsList]);

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
              <Typography fontSize={"1.2em"} fontWeight={600}>
                {section1Values[section]}
              </Typography>
              {icons[section]}
            </Box>
          </Box>
        </Grid>
      ))}

      {dailyProblem && (
        <Grid item xs={12}>
          <Box sx={{ ...styles.container, height: "auto", padding: 0 }}>
            <Typography padding={2} fontSize={"0.9em"} fontWeight={600}>
              Daily Problem
            </Typography>
            <Box
              display={"flex"}
              sx={{
                background: colors.background,
                padding: 2,
                borderTop: `solid 1px ${colors.superLight}`,
                borderBottom: `solid 1px ${colors.superLight}`,
                color: colors.defaultFont,
              }}
            >
              <Grid item xs={1}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  STATUS
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  TITLE
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  TAGS
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  DIFFICULTY
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  LAST UPDATED
                </Typography>
              </Grid>
            </Box>
            <Box
              display={"flex"}
              sx={{
                padding: 2,

                color: colors.defaultFont,
              }}
            >
              <Grid item xs={1}>
                <Box fontWeight={600}>
                  {constantProblemsList.findIndex(
                    (problem) => problem.problem.title === dailyProblem?.title
                  ) === -1 ? (
                    <AiOutlineMinusCircle size={20} color={colors.medium} />
                  ) : (
                    <BsCheck2Circle size={20} color={colors.easy} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Link
                  href={dailyProblem?.link}
                  target="#blank"
                  fontSize={"0.8em"}
                  fontWeight={600}
                  underline="none"
                >
                  {`${dailyProblem?.questionId}. ${dailyProblem?.title}`}
                </Link>
              </Grid>

              <Grid gap={2} item xs={4}>
                <Box gap={1} display={"flex"} flexWrap={"wrap"}>
                  {dailyProblem.topicTags.map((tag) => (
                    <Chip
                      style={{
                        backgroundColor: "#EDf2f9",
                        padding: 1,
                        fontWeight: 400,
                        fontSize: "0.8em",
                      }}
                      size="small"
                      label={tag.name}
                      key={tag.name}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  fontSize={"0.8em"}
                  fontWeight={600}
                  color={
                    colors[
                      dailyProblem.difficulty.toLowerCase() as
                        | "easy"
                        | "medium"
                        | "hard"
                    ]
                  }
                >
                  {dailyProblem.difficulty}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography fontSize={"0.7em"} fontWeight={600}>
                  {constantProblemsList.findIndex(
                    (problem) => problem.problem.title === dailyProblem?.title
                  ) === -1
                    ? "No Attempt"
                    : getDailyUpdatedAt()}
                </Typography>
              </Grid>
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item xs={8}>
        <Box
          sx={{
            background: colors.white,
            border: `solid 1px ${colors.superLight}`,
            borderRadius: 2,
            height: 340,
          }}
        >
          <Box
            marginRight={"auto"}
            borderBottom={`solid 1px ${colors.superLight}`}
          >
            <Typography padding={2} fontSize={"0.9em"} fontWeight={600}>
              Recent Activity
            </Typography>
          </Box>

          <Box height={"75%"} padding={2}>
            <RecentActivity recentActivity={dashboardData.recentActivity} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            background: colors.white,
            border: `solid 1px ${colors.superLight}`,
            borderRadius: 2,
            height: 340,
          }}
        >
          <Box
            marginRight={"auto"}
            borderBottom={`solid 1px ${colors.superLight}`}
          >
            <Typography padding={2} fontSize={"0.9em"} fontWeight={600}>
              Difficulty
            </Typography>
          </Box>
          <Box margin={"auto"} padding={2} height={"75%"}>
            <DifficultyChart difficultyData={dashboardData.difficultyData} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

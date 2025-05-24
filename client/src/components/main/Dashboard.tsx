import { Box, Chip, Grid, Link, Typography, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../common/styles";
import { PiPencilSimpleLine, PiThumbsDown, PiThumbsUp } from "react-icons/pi";
import { Problem, ProblemInfo } from "../../queries/problemQueries";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { formatRelativeTime } from "../../common/functions";
import DifficultyChart from "./charts/DifficultyChart";
import RecentActivity from "./charts/RecentActivity";
import { GoGraph } from "react-icons/go";
import { TbStairsUp } from "react-icons/tb";

type Icons = { [key: string]: any };

const styles = {
  container: {
    "background": "rgba(255, 255, 255, 0.95)",
    "backdropFilter": "blur(10px)",
    "border": "1px solid rgba(44, 123, 229, 0.1)",
    "padding": 3,
    "borderRadius": 3,
    "height": 120,
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "position": "relative",
    "overflow": "hidden",
    "opacity": 0,
    "animation": "fadeInUp 0.5s ease forwards",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #2c7be5, #17bcde)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      "transform": "translateY(-4px)",
      "boxShadow": "0px 12px 32px rgba(44, 123, 229, 0.12)",
      "&::before": {
        opacity: 1,
      },
    },
  },
  dailyProblemContainer: {
    "background": "rgba(255, 255, 255, 0.95)",
    "backdropFilter": "blur(10px)",
    "border": "1px solid rgba(44, 123, 229, 0.1)",
    "borderRadius": 3,
    "overflow": "hidden",
    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "opacity": 0,
    "animation": "fadeInUp 0.5s ease 0.2s forwards",
    "&:hover": {
      boxShadow: "0px 12px 32px rgba(44, 123, 229, 0.12)",
    },
  },
  chartContainer: {
    "background": "rgba(255, 255, 255, 0.95)",
    "backdropFilter": "blur(10px)",
    "border": "1px solid rgba(44, 123, 229, 0.1)",
    "borderRadius": 3,
    "height": 340,
    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "position": "relative",
    "overflow": "hidden",
    "opacity": 0,
    "animation": "fadeInUp 0.5s ease 0.3s forwards",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #2c7be5, #17bcde)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      "boxShadow": "0px 12px 32px rgba(44, 123, 229, 0.12)",
      "&::before": {
        opacity: 1,
      },
    },
  },
  header: {
    padding: 2,
    borderBottom: "1px solid rgba(44, 123, 229, 0.1)",
    background: "rgba(44, 123, 229, 0.02)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: "1.1em",
    fontWeight: 600,
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  statValue: {
    fontSize: "2em",
    fontWeight: 700,
    background: "linear-gradient(45deg, #2c7be5 30%, #17bcde 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 0.5,
  },
  statLabel: {
    color: "#626262",
    fontSize: "0.9em",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tag: {
    "backgroundColor": "rgba(44, 123, 229, 0.1)",
    "color": "#2c7be5",
    "fontWeight": 500,
    "fontSize": "0.8em",
    "padding": "4px 8px",
    "borderRadius": "6px",
    "transition": "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(44, 123, 229, 0.15)",
      transform: "translateY(-1px)",
    },
  },
  statusIcon: {
    "transition": "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  problemLink: {
    "fontSize": "1.1em",
    "fontWeight": 600,
    "color": "#2c3e50",
    "textDecoration": "none",
    "transition": "all 0.2s ease",
    "display": "flex",
    "alignItems": "center",
    "gap": 0.5,
    "&:hover": {
      color: "#2c7be5",
      transform: "translateX(4px)",
    },
  },
};

const section1: [
  "Total Problems",
  "Completed Problems",
  "In-Complete Problems"
] = ["Total Problems", "Completed Problems", "In-Complete Problems"];

const icons: Icons = {
  "Total Problems": (
    <PiPencilSimpleLine
      size={24}
      color="#2c7be5"
      style={{ marginLeft: "auto" }}
    />
  ),
  "Completed Problems": (
    <PiThumbsUp size={24} color="#2c7be5" style={{ marginLeft: "auto" }} />
  ),
  "In-Complete Problems": (
    <PiThumbsDown size={24} color="#2c7be5" style={{ marginLeft: "auto" }} />
  ),
};

const motivationalQuotes = [
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The best way to get started is to quit talking and begin doing.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Opportunities don't happen. You create them.",
  "Great things never come from comfort zones.",
  "Dream bigger. Do bigger.",
  "Push yourself, because no one else is going to do it for you.",
];

function getRandomQuote() {
  return motivationalQuotes[
    Math.floor(Math.random() * motivationalQuotes.length)
  ];
}

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

  // Simulate getting the user's name (replace with real user data if available)
  const userName = localStorage.getItem("leettrack_username") || "LeetTracker";
  const [quote] = useState(getRandomQuote());

  return (
    <>
      <Box
        sx={{
          mb: 4,
          p: 3,
          background: "linear-gradient(90deg, #e3f0ff 0%, #f8fcff 100%)",
          borderRadius: 3,
          boxShadow: "0 2px 12px rgba(44,123,229,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#2c7be5", mb: 1 }}
        >
          Welcome back, {userName}!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#2c3e50", fontStyle: "italic", maxWidth: 600 }}
        >
          {quote}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {section1.map((section, index) => (
          <Grid key={section} item xs={4}>
            <Box
              sx={{
                ...styles.container,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Typography sx={styles.statLabel}>{section}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={styles.statValue}>
                  {section1Values[section]}
                </Typography>
                <Tooltip title={`View ${section.toLowerCase()}`}>
                  <Box sx={{ marginLeft: "auto" }}>{icons[section]}</Box>
                </Tooltip>
              </Box>
            </Box>
          </Grid>
        ))}

        {dailyProblem && (
          <Grid item xs={12}>
            <Box sx={styles.dailyProblemContainer}>
              <Box sx={styles.header}>
                <Typography sx={styles.headerText}>
                  <BsCheck2Circle style={{ color: "#2c7be5" }} /> Daily Problem
                </Typography>
              </Box>
              <Box
                display={"flex"}
                sx={{
                  padding: 3,
                  color: colors.defaultFont,
                }}
              >
                <Grid item xs={1}>
                  <Tooltip
                    title={
                      constantProblemsList.findIndex(
                        (problem) =>
                          problem.problem.title === dailyProblem?.title
                      ) === -1
                        ? "Not Attempted"
                        : "Completed"
                    }
                  >
                    <Box sx={styles.statusIcon}>
                      {constantProblemsList.findIndex(
                        (problem) =>
                          problem.problem.title === dailyProblem?.title
                      ) === -1 ? (
                        <AiOutlineMinusCircle size={24} color={colors.medium} />
                      ) : (
                        <BsCheck2Circle size={24} color={colors.easy} />
                      )}
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                  <Link
                    href={dailyProblem?.link}
                    target="#blank"
                    sx={styles.problemLink}
                  >
                    {`${dailyProblem?.questionId}. ${dailyProblem?.title}`}
                  </Link>
                </Grid>

                <Grid gap={2} item xs={4}>
                  <Box gap={1} display={"flex"} flexWrap={"wrap"}>
                    {dailyProblem.topicTags.map((tag) => (
                      <Chip
                        sx={styles.tag}
                        size="small"
                        label={tag.name}
                        key={tag.name}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      display: "inline-block",
                      fontSize: "1em",
                      fontWeight: 600,
                      color:
                        colors[
                          dailyProblem.difficulty.toLowerCase() as
                            | "easy"
                            | "medium"
                            | "hard"
                        ],
                      background: "rgba(44, 123, 229, 0.07)",
                      border: `1.5px solid ${
                        colors[
                          dailyProblem.difficulty.toLowerCase() as
                            | "easy"
                            | "medium"
                            | "hard"
                        ]
                      }`,
                      borderRadius: "999px",
                      padding: "2px 16px",
                      minWidth: 0,
                      textAlign: "center",
                      letterSpacing: "0.5px",
                      boxShadow: "none",
                      margin: 0,
                    }}
                  >
                    {dailyProblem.difficulty}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontSize: "0.9em",
                      fontWeight: 500,
                      color: "#626262",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
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
          <Box sx={styles.chartContainer}>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>
                <GoGraph style={{ color: "#2c7be5" }} /> Recent Activity
              </Typography>
            </Box>
            <Box height={"75%"} padding={3}>
              <RecentActivity recentActivity={dashboardData.recentActivity} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={styles.chartContainer}>
            <Box sx={styles.header}>
              <Typography sx={styles.headerText}>
                <TbStairsUp style={{ color: "#2c7be5" }} /> Difficulty
                Distribution
              </Typography>
            </Box>
            <Box margin={"auto"} padding={3} height={"75%"}>
              <DifficultyChart difficultyData={dashboardData.difficultyData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

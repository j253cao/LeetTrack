import { Box, Button, Chip, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { Problem as ProblemType } from "../../../queries/problemQueries";

import { AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { colors } from "../../../common/styles";
export default function Problem({
  problem,
  handleDeleteProblem,
}: {
  problem: ProblemType;
  handleDeleteProblem: (title: string) => void;
}) {
  const problemFieldSpacing = {
    status: 1,
    title: 3,
    tags: 4,
    difficulty: 2,
    lastUpdated: 2,
  };

  const getDifficultyColor = (
    difficulty: string
  ): "easy" | "medium" | "hard" => {
    return difficulty.toLowerCase() as "easy" | "medium" | "hard";
  };

  const getMonthAsString = (month: number): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months[month - 1];
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = getMonthAsString(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} ${year}`;
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours === 0) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      }
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    return formatDate(date);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={problemFieldSpacing.status}>
        <Box padding={2}>
          {problem.status === "Complete" ? (
            <BsCheck2Circle size={20} color={colors.easy} />
          ) : (
            <AiOutlineMinusCircle size={20} color={colors.medium} />
          )}
        </Box>
      </Grid>
      <Grid flexWrap={"wrap"} item xs={problemFieldSpacing.title}>
        <Box padding={2}>
          <Link
            fontSize={"0.9em"}
            underline="none"
            target="#blank"
            sx={{ "&:hover": { cursor: "pointer" } }}
            href={problem.problem.link}
          >{`${problem.problem.questionId}. ${problem.problem.title}`}</Link>
        </Box>
      </Grid>
      <Grid flexWrap={"wrap"} item xs={problemFieldSpacing.tags}>
        <Box display={"flex"} flexWrap={"wrap"} padding={2} gap={1}>
          {problem.problem.topicTags.map(({ name }) => (
            <Chip
              style={{
                backgroundColor: "#EDf2f9",
                padding: 2,
                fontSize: "0.8em",
              }}
              size="small"
              label={name}
              key={name}
            />
          ))}
        </Box>
      </Grid>
      <Grid flexWrap={"wrap"} item xs={2}>
        <Typography
          fontSize={"0.9em"}
          paddingTop={2}
          color={colors[getDifficultyColor(problem.problem.difficulty)]}
        >
          {problem.problem.difficulty}
        </Typography>
      </Grid>
      <Grid flexWrap={"wrap"} item xs={2}>
        <Box
          display={"flex"}
          alignItems={"center"}
          paddingTop={2}
          justifyContent={"center"}
        >
          <Typography fontSize={"0.9em"}>
            {formatRelativeTime(new Date(problem.updatedAt))}
          </Typography>
          <Button
            disableRipple
            sx={{
              "color": colors.defaultFont,
              "&:hover": { background: colors.background, color: "red" },
              "borderRadius": 0,
              "padding": 0,
              "fontWeight": "bold",
              "fontSize": "0.8em",
              "marginLeft": "auto",
            }}
            onClick={() => handleDeleteProblem(problem.problem.title)}
          >
            <AiOutlineDelete size={20} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

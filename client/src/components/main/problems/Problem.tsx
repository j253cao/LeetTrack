import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import React from "react";
import { Problem as ProblemType } from "../../../queries/problemQueries";
import { AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { colors } from "../../../common/styles";
import { formatRelativeTime } from "../../../common/functions";
import { FiClock } from "react-icons/fi";

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

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      sx={{
        "background": "none",
        "borderRadius": 0,
        "boxShadow": "none",
        "mb": 0,
        "px": 0.5,
        "py": 0.25,
        "borderBottom": "1px solid #e3e8ee",
        "transition": "background 0.2s",
        "minHeight": 36,
        "&:hover": {
          background: "#f8fbff",
        },
      }}
      wrap="wrap"
    >
      {/* Status Icon */}
      <Grid
        item
        xs={problemFieldSpacing.status}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background:
              problem.status === "Complete"
                ? "rgba(46,213,115,0.10)"
                : "rgba(255,159,67,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {problem.status === "Complete" ? (
            <BsCheck2Circle size={14} color={colors.easy} />
          ) : (
            <AiOutlineMinusCircle size={14} color={colors.medium} />
          )}
        </Box>
      </Grid>
      {/* Title */}
      <Grid item xs={problemFieldSpacing.title} minWidth={0}>
        <Box px={1} py={0.5} sx={{ overflow: "hidden" }}>
          <Link
            fontSize={"0.9em"}
            fontWeight={500}
            underline="none"
            target="#blank"
            sx={{
              "color": "#2c3e50",
              "transition": "color 0.2s",
              "whiteSpace": "nowrap",
              "overflow": "hidden",
              "textOverflow": "ellipsis",
              "&:hover": { color: "#2c7be5" },
              "cursor": "pointer",
            }}
            href={problem.problem.link}
          >
            {`${problem.problem.questionId}. ${problem.problem.title}`}
          </Link>
        </Box>
      </Grid>
      {/* Tags */}
      <Grid item xs={problemFieldSpacing.tags} minWidth={0}>
        <Box display={"flex"} flexWrap={"wrap"} px={1} py={0.5} gap={0.5}>
          {problem.problem.topicTags.map(({ name }) => (
            <Chip
              sx={{
                backgroundColor: "#e3f0ff",
                color: "#2c7be5",
                fontWeight: 500,
                fontSize: "0.75em",
                borderRadius: "999px",
                px: 1,
                py: 0,
                height: 20,
                letterSpacing: 0.2,
              }}
              size="small"
              label={name}
              key={name}
            />
          ))}
        </Box>
      </Grid>
      {/* Difficulty */}
      <Grid item xs={2} minWidth={0}>
        <Box pt={1} display="flex" alignItems="center" height={20}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.78em",
              fontWeight: 600,
              color: colors[getDifficultyColor(problem.problem.difficulty)],
              background: "rgba(44, 123, 229, 0.05)",
              border: `1px solid ${
                colors[getDifficultyColor(problem.problem.difficulty)]
              }`,
              borderRadius: "999px",
              px: 1.5,
              height: 20,
              minWidth: 0,
              textAlign: "center",
              letterSpacing: "0.5px",
              boxShadow: "none",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {problem.problem.difficulty}
          </Typography>
        </Box>
      </Grid>
      {/* Last Updated & Delete */}
      <Grid item xs={2} minWidth={0}>
        <Box
          display={"flex"}
          alignItems={"center"}
          pt={1}
          justifyContent={"center"}
        >
          <FiClock style={{ marginRight: 2, color: "#b0b8c1" }} size={13} />
          <Typography fontSize={"0.8em"} color="#b0b8c1">
            {formatRelativeTime(new Date(problem.updatedAt))}
          </Typography>
          <Tooltip title="Delete problem">
            <IconButton
              size="small"
              sx={{
                "ml": 1,
                "color": "#b0b8c1",
                "transition": "color 0.2s, background 0.2s",
                "&:hover": {
                  color: "#e74c3c",
                  background: "rgba(231,76,60,0.08)",
                },
              }}
              onClick={() => handleDeleteProblem(problem.problem.title)}
            >
              <AiOutlineDelete size={15} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
}

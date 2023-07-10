import { Box, Button, Checkbox, Chip, Link, Typography } from "@mui/material";
import React from "react";
import { RiExternalLinkFill } from "react-icons/ri";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

import { ProblemInfo } from "../../queries/problemQueries";
import { colors, styles } from "../../common/styles";

const Tag = ({ name }: { name: string }) => {
  return (
    <Box>
      <Chip size="small" label={name} />
    </Box>
  );
};

export default function ProblemDisplay({
  problemInfo,
  setProblemInfo,
  problemCompleted,
  setProblemCompleted,
  handleSubmitProblem,
}: {
  problemInfo: ProblemInfo;
  setProblemInfo: React.Dispatch<React.SetStateAction<ProblemInfo | undefined>>;
  problemCompleted: boolean;
  setProblemCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitProblem: () => void;
}) {
  const handleNavigateBack = () => {
    setProblemInfo(undefined);
  };

  const pageStyles = {
    problemLink: {
      border: "none",
      color: colors.black,
      display: "flex",
      alignItems: "center",
    },
    backButton: {
      padding: 0,
      paddingLeft: 0,
      color: colors.black,
      maxWidth: 30,
    },
  };

  const difficultyColors = {
    Easy: colors.easy,
    Medium: colors.medium,
    Hard: colors.hard,
  };

  return (
    <Box width={"100%"}>
      <Box id="problem-info-container">
        <Box
          display={"flex"}
          maxWidth={40}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <MdOutlineKeyboardBackspace onClick={handleNavigateBack} size={30} />
        </Box>

        <Box display={"flex"} marginBottom={1}>
          <Link
            sx={pageStyles.problemLink}
            underline="none"
            href={problemInfo.link}
            variant="h5"
            target="_blank"
          >
            {problemInfo.questionId + ". "}
            {problemInfo.title}
            <RiExternalLinkFill style={{ marginLeft: 5 }} />
          </Link>
        </Box>
        <Box marginBottom={1} display={"flex"}>
          <Typography marginRight={1}>Difficulty: </Typography>
          <Typography color={difficultyColors[problemInfo.difficulty]}>
            {problemInfo.difficulty}
          </Typography>
        </Box>
        <Typography>Related Topics</Typography>

        <Box marginBottom={1} flexWrap={"wrap"} display={"flex"}>
          {problemInfo.topicTags.map((tag, index) => (
            <Box key={index} marginRight={1}>
              <Tag name={tag.name} />
            </Box>
          ))}
        </Box>
        <Box>
          Completed
          <Checkbox
            checked={problemCompleted}
            onChange={(e) => {
              setProblemCompleted(e.target.checked);
            }}
          />
        </Box>

        <Box display={"flex"}>
          <Button
            onClick={handleSubmitProblem}
            sx={{ ...styles.defaultContainedButton, marginLeft: "auto" }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

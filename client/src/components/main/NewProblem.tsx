import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { allProblems } from "../../assets/AllProblemList";
import { colors, styles } from "../../common/styles";
import {
  Problem,
  ProblemInfo,
  problemQueries,
} from "../../queries/problemQueries";
import ProblemDisplay from "./ProblemDisplay";

type HandleSelectedProblem = (
  event: React.SyntheticEvent<Element, Event>,
  value: string | null
) => void;

const pageStyles = {
  autocomplete: {
    width: "50^",
  },
  disabledButton: {
    border: `1px solid ${colors.buttonBackground}`,
    color: colors.buttonBackground,
    background: colors.white,
  },
};

const NewProblemForm = ({
  handleSelectedProblem,
  selectedProblem,
  handleGetProblemInfo,
}: {
  handleSelectedProblem: HandleSelectedProblem;
  selectedProblem: string;
  handleGetProblemInfo: () => Promise<void>;
}) => {
  return (
    <Box width={"100%"}>
      <Typography
        fontSize={"1.2em"}
        marginBottom={3}
        fontWeight={500}
        color={colors.light}
      >
        Enter a leetcode problem*
      </Typography>

      <Autocomplete
        fullWidth
        disablePortal
        sx={pageStyles.autocomplete}
        renderInput={(params) => (
          <TextField {...params} label="Problem Title" />
        )}
        options={allProblems.map((problem) => problem.title)}
        freeSolo
        value={selectedProblem}
        onChange={(event, value) => handleSelectedProblem(event, value)}
        defaultValue={""}
      />
      <Box marginTop={4} display={"flex"}>
        <Button
          sx={{
            ...styles.defaultContainedButton,
            "&:disabled": pageStyles.disabledButton,
            "marginLeft": "auto",
          }}
          onClick={handleGetProblemInfo}
          disableRipple
          disabled={!selectedProblem}
          size="large"
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default function NewProblem({
  setModalOpen,
  setProblemsList,
  setConstantProblemsList,
}: {
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
  setProblemsList: React.Dispatch<React.SetStateAction<Problem[]>>;
  setConstantProblemsList: React.Dispatch<React.SetStateAction<Problem[]>>;
}) {
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  const [problemInfo, setProblemInfo] = useState<ProblemInfo>();

  const handleSelectedProblem: HandleSelectedProblem = (event, value) => {
    if (value) {
      setSelectedProblem(value);
    } else {
      setSelectedProblem("");
    }
  };

  const handleGetProblemInfo = async () => {
    let title = selectedProblem.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
    title = title.map((title) => title.toLowerCase());
    const titleSlug = title.join("-");

    const response = await problemQueries.getProblemInfo(titleSlug);
    if (response.problemInfo) setProblemInfo(response.problemInfo);
  };

  const [problemCompleted, setProblemCompleted] = useState(false);

  const handleSubmitProblem = async () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const body = {
        problem: problemInfo!,
        status: problemCompleted ? "Complete" : "In-Complete",
        updatedAt: new Date().toDateString(),
      };

      const response = await problemQueries.createProblem(body, jwt);
      if (response.problems) {
        setConstantProblemsList(response.problems);
        setProblemsList(response.problems);
      }
      setModalOpen(false);
    } else {
      console.log("no token");
    }
  };

  return (
    <Box
      sx={{
        background: colors.white,
        padding: 5,
        borderRadius: 4,
        boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.62)",
      }}
      display={"flex"}
    >
      {problemInfo ? (
        <ProblemDisplay
          problemInfo={problemInfo}
          setProblemInfo={setProblemInfo}
          problemCompleted={problemCompleted}
          setProblemCompleted={setProblemCompleted}
          handleSubmitProblem={handleSubmitProblem}
        />
      ) : (
        <NewProblemForm
          handleSelectedProblem={handleSelectedProblem}
          selectedProblem={selectedProblem}
          handleGetProblemInfo={handleGetProblemInfo}
        />
      )}
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { colors, styles } from "../common/styles";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInHeader from "../components/main/LoggedInHeader";
import Dashboard from "../components/main/Dashboard";
import { capitalizeFirst } from "../common/functions";
import Problems from "../components/main/Problems";
import NewProblem from "../components/main/NewProblem";
import {
  Problem,
  ProblemInfo,
  problemQueries,
} from "../queries/problemQueries";

const pageStyles = {
  container: {
    background: colors.background,
    height: "100vh",
    padding: 0,
    paddingInline: "15%",
    paddingTop: 2,
  },
  headerContainer: {
    borderBottom: `solid 1px ${colors.superLight}`,
    paddingBottom: 2,
  },
  modalForm: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
  },
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };

  const pageName = location.pathname.slice(
    location.pathname.indexOf("/", 1) + 1
  );

  const [selectStatusField, setSelectStatusField] = useState("");
  const [selectDifficultyField, setSelectDifficultyField] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [constantProblemsList, setConstantProblemsList] = useState<Problem[]>(
    []
  );
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [dailyProblem, setDailyProblem] = useState<ProblemInfo>();

  useEffect(() => {
    const fetchProblems = async () => {
      setDataLoading(true);
      const jwt = localStorage.getItem("token");
      if (!jwt) return;
      const getAllProblems = problemQueries.getAllProblems(jwt);
      const getDailyProblem = problemQueries.getDailyProblem(jwt);
      try {
        const [allProblems, dailyProblem] = await Promise.allSettled([
          getAllProblems,
          getDailyProblem,
        ]);

        if (allProblems.status === "fulfilled") {
          setConstantProblemsList(allProblems.value.problems);
          setProblemsList(allProblems.value.problems);
        }

        if (dailyProblem.status === "fulfilled") {
          setDailyProblem(dailyProblem.value.problemInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProblems();
    setDataLoading(false);
  }, []);
  return (
    <Box>
      <LoggedInHeader
        location={location.pathname}
        handleNavigate={handleNavigate}
      />
      <Box id="content-container" sx={pageStyles.container}>
        <Box id="content-header" sx={pageStyles.headerContainer}>
          <Typography fontWeight={600} fontSize={"0.7em"} color={colors.light}>
            OVERVIEW
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography flexGrow={1} variant="h5" fontWeight={600}>
              {capitalizeFirst(pageName)}
            </Typography>
            {location.pathname !== "/home/new-problem" && (
              <Button
                onClick={() => setModalOpen(true)}
                sx={styles.defaultContainedButton}
              >
                Add Problem
              </Button>
            )}
          </Box>
        </Box>

        <Box marginTop={3}>
          {location.pathname === "/home/dashboard" &&
            dailyProblem &&
            constantProblemsList && (
              <Dashboard
                dailyProblem={dailyProblem}
                constantProblemsList={constantProblemsList}
              />
            )}
          {location.pathname === "/home/problems" && (
            <Problems
              selectStatusField={selectStatusField}
              setSelectStatusField={setSelectStatusField}
              selectDifficultyField={selectDifficultyField}
              setSelectDifficultyField={setSelectDifficultyField}
              problemsList={problemsList}
              setProblemsList={setProblemsList}
              constantProblemsList={constantProblemsList}
              setConstantProblemsList={setConstantProblemsList}
            />
          )}
          <Modal onClose={() => setModalOpen(false)} open={modalOpen}>
            <Box sx={pageStyles.modalForm}>
              <NewProblem
                setProblemsList={setProblemsList}
                setModalOpen={setModalOpen}
                setConstantProblemsList={setConstantProblemsList}
              />
            </Box>
          </Modal>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={dataLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

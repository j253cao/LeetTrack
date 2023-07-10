import { Box, Button, Grid, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

import { colors, styles } from "../../common/styles";
import SelectFields from "./problems/SelectFields";

import {
  ProblemInfo,
  Problem as ProblemType,
  Tag,
  problemQueries,
} from "../../queries/problemQueries";
import Problem from "./problems/Problem";
import SearchBar from "./problems/SearchBar";

interface ProblemsProps {
  selectStatusField: string;
  setSelectStatusField: (target: string) => void;
  selectDifficultyField: string;
  setSelectDifficultyField: (target: string) => void;
  problemsList: ProblemType[];
  setProblemsList: React.Dispatch<React.SetStateAction<ProblemType[]>>;
  constantProblemsList: ProblemType[];
  setConstantProblemsList: React.Dispatch<React.SetStateAction<ProblemType[]>>;
}

function searchProblem(problem: ProblemType, searchTerm: string): boolean {
  return (
    searchProblemInfo(problem.problem, searchTerm) ||
    problem.status.toLowerCase().includes(searchTerm)
  );
}

function searchProblemInfo(
  problemInfo: ProblemInfo,
  searchTerm: string
): boolean {
  return (
    problemInfo.questionId.toLowerCase().includes(searchTerm) ||
    problemInfo.title.toLowerCase().includes(searchTerm) ||
    problemInfo.titleSlug.toLowerCase().includes(searchTerm) ||
    problemInfo.difficulty.toLowerCase().includes(searchTerm) ||
    problemInfo.topicTags.some((tag) => searchTag(tag, searchTerm)) ||
    problemInfo.link.toLowerCase().includes(searchTerm)
  );
}

function searchTag(tag: Tag, searchTerm: string): boolean {
  return (
    tag.name.toLowerCase().includes(searchTerm) ||
    tag.slug.toLowerCase().includes(searchTerm)
  );
}

const pageStyles = {
  pageButtons: {
    "color": colors.defaultFont,
    "&:hover": { background: colors.white, color: colors.black },
    "borderRadius": 0,
    "minHeight": "100%",
    "padding": 0,
    "fontWeight": "bold",
    "fontSize": "0.8em",
  },
  filterContainer: {
    borderBottom: `1px solid ${colors.superLight}`,
    padding: 2,
  },
};

const SortFields = () => {
  const fieldMap: Map<string, number> = new Map();
  fieldMap.set("status", 1);
  fieldMap.set("title", 3);
  fieldMap.set("tags", 4);
  fieldMap.set("difficulty", 2);
  fieldMap.set("last updated", 2);

  return (
    <Grid container spacing={2}>
      {Array.from(fieldMap.keys()).map((field) => (
        <Grid key={field} item xs={fieldMap.get(field)}>
          {field !== "tags" ? (
            <Button disableRipple sx={pageStyles.pageButtons}>
              {field}
              <TiArrowUnsorted style={{ padding: 0 }} />
            </Button>
          ) : (
            <Button
              disableRipple
              sx={{
                ...pageStyles.pageButtons,
                "&:hover": { background: colors.background },
              }}
            >
              {field}
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default function Problems(props: ProblemsProps) {
  const handleSelectStatusField = (target: string) => {
    if (target === props.selectStatusField) {
      props.setSelectStatusField("");
      setFilters((prev) => ({ ...prev, status: "" }));
    } else {
      props.setSelectStatusField(target);
      setFilters((prev) => ({ ...prev, status: target }));
    }
  };
  const handleSelectDifficultyField = (target: string) => {
    if (target === props.selectDifficultyField) {
      props.setSelectDifficultyField("");
      setFilters((prev) => ({ ...prev, difficulty: "" }));
    } else {
      props.setSelectDifficultyField(target);
      setFilters((prev) => ({ ...prev, difficulty: target }));
    }
  };

  const handleDeleteProblem = async (title: string) => {
    const jwt = localStorage.getItem("token");
    if (!jwt) return;
    const response = await problemQueries.deleteProblem(title, jwt);
    if (!response.success) return;
    props.setConstantProblemsList(response.problems);
    props.setProblemsList(response.problems);
  };

  const [filters, setFilters] = useState<{
    status: string;
    difficulty: string;
    search: string;
  }>({ status: "", difficulty: "", search: "" });

  useEffect(() => {
    if (
      filters.status === "" &&
      filters.difficulty === "" &&
      filters.search === ""
    ) {
      props.setProblemsList(props.constantProblemsList);
      return;
    }
    let problems = props.constantProblemsList.filter((problem) => {
      return searchProblem(problem, filters.search);
    });
    console.log(problems);

    problems = problems.filter((problem) => {
      if (filters.status !== "" && filters.difficulty !== "") {
        return (
          problem.status.toLowerCase() === filters.status &&
          problem.problem.difficulty.toLowerCase() === filters.difficulty
        );
      } else if (filters.status !== "") {
        return problem.status.toLowerCase() === filters.status;
      } else if (filters.difficulty !== "") {
        return problem.problem.difficulty.toLowerCase() === filters.difficulty;
      }
      return problem;
    });
    props.setProblemsList(problems);
  }, [filters]);

  const handleSearchFilter = (target: string) => {
    setSearchFilter(target);
    setFilters((prev) => ({ ...prev, search: target }));
  };
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        <SelectFields
          selectStatusField={props.selectStatusField}
          handleSelectStatusField={handleSelectStatusField}
          selectDifficultyField={props.selectDifficultyField}
          handleSelectDifficultyField={handleSelectDifficultyField}
        />
        <Box marginLeft={"auto"} display={"flex"}>
          <SearchBar
            handleSearchFilter={handleSearchFilter}
            searchFilter={searchFilter}
          />
          <Button
            onClick={() => {
              props.setSelectDifficultyField("");
              props.setSelectStatusField("");
              setSearchFilter("");
              setFilters({ status: "", difficulty: "", search: "" });
            }}
            sx={{ ...styles.defaultContainedButton, marginLeft: 5 }}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>
      <Box sx={pageStyles.filterContainer}>
        <SortFields />
      </Box>
      <Box>
        {props.problemsList.map((problem) => {
          return (
            <Problem
              key={problem.problem.title}
              handleDeleteProblem={handleDeleteProblem}
              problem={problem}
            />
          );
        })}
      </Box>
    </Box>
  );
}

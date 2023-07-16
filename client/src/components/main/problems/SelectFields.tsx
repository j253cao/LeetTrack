import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { capitalizeFirst } from "../../../common/functions";
import { TbCheck } from "react-icons/tb";
import { Problem } from "../../../queries/problemQueries";
import { useEffect, useState } from "react";

const pageStyles = {
  selectBox: {
    height: 40,
    fontSize: "1em",
  },
  selectOption: {
    fontSize: "1em",
    display: "flex",
    alignItems: "center",
    border: "none",
  },
};

export default function SelectFields({
  selectStatusField,
  handleSelectStatusField,
  selectDifficultyField,
  handleSelectDifficultyField,
}: {
  selectStatusField: string;
  handleSelectStatusField: (target: string) => void;
  selectDifficultyField: string;
  handleSelectDifficultyField: (target: string) => void;
}) {
  const status = ["complete", "in-complete"];
  const difficulty = ["easy", "medium", "hard"];

  return (
    <Grid container maxWidth={"50%"} spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>
          <Select
            renderValue={(selected) => (
              <Typography>{capitalizeFirst(selected)}</Typography>
            )}
            sx={pageStyles.selectBox}
            value={selectStatusField}
            defaultValue=""
            label="Status"
            onChange={(e) => {
              handleSelectStatusField(e.target.value as string);
            }}
          >
            {status.map((stat) => (
              <MenuItem
                onClick={() => handleSelectStatusField(stat)}
                key={stat}
                sx={pageStyles.selectOption}
                value={stat}
              >
                {capitalizeFirst(stat)}
                {selectStatusField === stat && (
                  <TbCheck style={{ marginLeft: "auto" }} />
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth size="small">
          <InputLabel>Difficulty</InputLabel>
          <Select
            renderValue={(selected) => (
              <Typography>{capitalizeFirst(selected)}</Typography>
            )}
            sx={pageStyles.selectBox}
            value={selectDifficultyField}
            defaultValue=""
            label="Difficulty"
            onChange={(e) => {
              handleSelectDifficultyField(e.target.value as string);
            }}
          >
            {difficulty.map((diff) => (
              <MenuItem
                onClick={() => handleSelectDifficultyField(diff)}
                key={diff}
                sx={pageStyles.selectOption}
                value={diff}
              >
                {capitalizeFirst(diff)}
                {selectDifficultyField === diff && (
                  <TbCheck style={{ marginLeft: "auto" }} />
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

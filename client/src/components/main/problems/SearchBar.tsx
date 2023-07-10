import React, { memo } from "react";
import { colors } from "../../../common/styles";
import { InputAdornment } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FiSearch } from "react-icons/fi";

const TextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: colors.background,
    height: 40,
    padding: 0,
    paddingBottom: 10,
    borderBottom: `1px solid ${colors.superLight}`,
    outline: "none",
  },
  "& .MuiInputAdornment-root": {
    background: colors.background,
    paddingLeft: 0,
  },
  "& .MuiFilledInput-root:hover": {
    borderBottom: `1px solid ${colors.black}`,
    background: colors.background,
  },
  "& .MuiFilledInput-root:focus": {
    borderBottom: `1px solid ${colors.black}`,
    background: colors.background,
  },
}));

const SearchBar = memo(
  ({
    handleSearchFilter,
    searchFilter,
  }: {
    handleSearchFilter: (target: string) => void;
    searchFilter: string;
  }) => {
    return (
      <TextField
        variant="filled"
        size="medium"
        value={searchFilter}
        onChange={(e) => handleSearchFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ background: "white" }} position="start">
              <FiSearch />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
      />
    );
  }
);

export default SearchBar;

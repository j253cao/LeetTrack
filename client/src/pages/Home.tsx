import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Autocomplete,
} from "@mui/material";

import { styles } from "../common/styles";
import { allProblems } from "../assets/AllProblemList";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { authQueries } from "../queries/authQueries";
import { Problem, ProblemSubmit, problemQueries } from "../queries/problemQueries";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.1 },
  {
    field: "name",
    headerName: "Name",
    flex: 0.3,
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    flex: 0.2,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 0.3,
  },
  {
    field: "tags",
    headerName: "Tags",
    flex: 0.3,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.2,
  },
  {
    field: "link",
    headerName: "Link",
    flex: 0.2,
    renderCell: (params) => (
      <Link href={params.value} target="_blank">
        {`leetcode/${params.value.slice(30, params.value.length - 1)}`}
      </Link>
    ),
  },
];

const validateProblemInput = (problem: ProblemSubmit) => {
  return {
    difficulty: ["Easy", "Medium", "Hard"].includes(problem.difficulty),
    status: ["Completed", "In-Progress", "Planned"].includes(problem.status),
    notes: typeof problem.notes === "string",
    tags: typeof problem.tags === "string",
    link: typeof problem.link === "string" && problem.link !== "",
    id: !isNaN(problem.id),
    name: typeof problem.name === "string" && problem.name !== "",
  };
};

export default function Home() {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate("/" + route);
  };
  const checkLogin = async () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      handleNavigate("login");
    }
    const response = await authQueries.verifyUser(jwt!);
    if (!response) handleNavigate("login");
    return jwt;
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const [data, setData] = useState<Problem[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [problem, setProblem] = useState<ProblemSubmit>({
    id: -1,
    name: "",
    difficulty: "",
    notes: "",
    tags: "",
    status: "",
    link: "",
  });

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const filter = e.target.value.toLocaleLowerCase();
    filter === "" ? setFilterOn(false) : setFilterOn(true);
    setFilteredDataSet(data.filter((data) => data.name.toLocaleLowerCase().includes(filter)));
  };

  const onChangeInput = (target: string, value: string | number) => {
    if (target === "id") {
      setProblem({ ...problem, [target]: parseInt(value as string) });
    } else {
      setProblem({ ...problem, [target]: value });
    }
  };

  const [validActionSnackbar, setValidActionSnackbar] = useState<[boolean, string]>([false, ""]);
  const [loading, setLoading] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const [filteredDataSet, setFilteredDataSet] = useState<Problem[]>([]);
  const [selectedPage, setSelectedPage] = useState<"list" | "statistics">("list");
  const [completedProblems, setCompletedProblems] = useState<{ Easy: number; Medium: number; Hard: number }>({ Easy: 0, Medium: 0, Hard: 0 });
  const [commonTopics, setCommonTopics] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      const token = await checkLogin();
      if (!token) {
        setValidActionSnackbar([true, "You are unauthorized to make this action. Redirecting you."]);
      } else {
        setLoading(true);
        const response = await problemQueries.getAllProblems(token);

        if (!response || !response.success) {
          setValidActionSnackbar([true, "Server Error"]);
        }

        if (response.success) {
          setData(response.problems!);
        }
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const updateCompletedProblemsCount = () => {
      const newCount = { Easy: 0, Medium: 0, Hard: 0 };
      data.forEach((item) => (item.difficulty !== "" ? (newCount[item.difficulty] += 1) : null));
      setCompletedProblems(newCount);
    };
    const updateCommonTopicsCount = () => {
      const commonTopics = {};
      data.forEach((item) => item.tags);
    };
    updateCompletedProblemsCount();
  }, [data]);

  const handleProblemSubmit = async () => {
    const valid = validateProblemInput(problem);
    if (!Object.values(valid).every((value) => value === true)) {
      setValidActionSnackbar([true, "One of the following fields has an improper input"]);
    } else {
      const token = await checkLogin();
      if (!token) {
        setValidActionSnackbar([true, "You are unauthorized to make this action. Redirecting you."]);
      } else {
        setLoading(true);
        const response = await problemQueries.createProblem(problem, token);
        setLoading(false);
        if (!response || !response.success) {
          setValidActionSnackbar([true, "Server Error"]);
        }

        if (response.success) {
          setData([...data, response.savedProblem]);
          console.log(response.savedProblem);
        }

        setProblem({
          id: -1,
          name: "",
          difficulty: "",
          notes: "",
          tags: "",
          status: "",
          link: "",
        });
      }
      setAddDialogOpen(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const token = await checkLogin();

      if (!token) {
        setValidActionSnackbar([true, "You are unauthorized to make this action. Redirecting you."]);
      } else {
        const idsToDelete = selectedRows.map((row) => row._id);
        setLoading(true);
        const response = await problemQueries.deleteAllProblems(idsToDelete, token);
        setLoading(false);
        if (!response || !response.success) {
          setValidActionSnackbar([true, "There was an issue processing your request"]);
        } else {
          setData(data.filter((item) => !new Set(idsToDelete).has(item._id)));
        }
      }
    } catch (error) {}
  };
  const [selectedRows, setSelectedRows] = useState<Problem[]>([]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <AppBar position="static">
          <Toolbar style={{ background: "white", color: "black", boxShadow: "none", paddingInline: "10%" }}>
            <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
              <Typography variant="h5">Leet Track</Typography>
              <Button
                onClick={() => setSelectedPage("list")}
                sx={{
                  "marginLeft": 5,
                  "color": "black",
                  "&:hover": {
                    backgroundColor: "#bfbfbf",
                  },
                }}
              >
                Home
              </Button>
              <Button
                onClick={() => setSelectedPage("statistics")}
                sx={{
                  "marginLeft": 5,
                  "color": "black",
                  "&:hover": {
                    backgroundColor: "#bfbfbf",
                  },
                }}
              >
                Statistics
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{ ...styles.containedButtonBlack }}
              size="medium"
              onClick={() => {
                localStorage.clear();
                handleNavigate("login");
              }}
              color="primary"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {selectedPage === "list" ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Box sx={{ width: "80vw", display: "flex", justifyContent: "space-around" }}>
              <TextField autoComplete="off" onChange={(e) => handleSearchFilter(e)} type="search" id="search" label="Search" size="small" sx={{ marginBottom: 3, borderRadius: "40%" }} />
              <Box sx={{ marginLeft: "auto" }}>
                <Button onClick={handleDeleteItem} disabled={selectedRows.length === 0} variant="contained" sx={{ ...styles.containedButtonWhite, background: "white", color: "black" }}>
                  Delete
                </Button>
                <Button onClick={() => setAddDialogOpen(true)} variant="contained" sx={{ ...styles.containedButtonBlack, marginLeft: 3 }}>
                  Add
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: "80vw" }}>
              <DataGrid
                rows={filterOn ? filteredDataSet : data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                getRowId={(row: Problem) => `${row._id}`}
                disableColumnMenu={true}
                checkboxSelection
                disableVirtualization
                pageSizeOptions={[5, 10, 15]}
                onRowSelectionModelChange={(row) => {
                  const rowsToFind = new Set(row);
                  const selectedRows = data.filter((item) => rowsToFind.has(item._id));
                  setSelectedRows(selectedRows);
                }}
              />
            </Box>
            {data.length === 0 ? <h5>You currently have no added problems, use the add button to begin.</h5> : null}
          </Box>
          <Dialog open={false} onClose={() => setAddDialogOpen(false)}>
            <DialogTitle sx={{ m: 1 }}>Add Problem</DialogTitle>
            <DialogContent
              sx={{
                "& .MuiTextField-root": { m: 1 },
                "minWidth": 500,
              }}
            >
              <Box>
                <TextField
                  onChange={(e) => onChangeInput("id", e.target.value)}
                  sx={{ m: 1, width: "42%" }}
                  required
                  multiline
                  maxRows={1}
                  autoComplete="off"
                  autoFocus
                  margin="dense"
                  id="number"
                  label="ID"
                  type="email"
                  variant="standard"
                />
                <TextField
                  onChange={(e) => onChangeInput("name", e.target.value as string)}
                  required
                  maxRows={3}
                  multiline
                  sx={{ width: "50%" }}
                  autoComplete="off"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  variant="standard"
                />
              </Box>
              <Box>
                <FormControl required variant="standard" sx={{ m: 1, width: "42%" }}>
                  <InputLabel id="demo-simple-select-standard-label">Difficulty</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={problem.difficulty}
                    label="Difficulty"
                    onChange={(e) => onChangeInput("difficulty", e.target.value as string)}
                  >
                    <MenuItem value={"Easy"}>Easy</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  onChange={(e) => onChangeInput("notes", e.target.value as string)}
                  sx={{ width: "50%" }}
                  multiline
                  autoComplete="off"
                  autoFocus
                  margin="dense"
                  id="name"
                  placeholder="Optimal Solution: O(n)"
                  label="Notes"
                  type="text"
                  variant="standard"
                />
              </Box>
              <Box>
                <FormControl required variant="standard" sx={{ m: 1, width: "42%" }}>
                  <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={problem.status}
                    label="Status"
                    onChange={(e) => onChangeInput("status", e.target.value as string)}
                  >
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
                    <MenuItem value={"Planned"}>Planned</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  maxRows={3}
                  sx={{ width: "50%" }}
                  multiline
                  autoComplete="off"
                  placeholder="Hash Map, Array, ..."
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Tags"
                  type="text"
                  variant="standard"
                  onChange={(e) => onChangeInput("tags", e.target.value as string)}
                />
              </Box>
              <TextField
                onChange={(e) => onChangeInput("link", e.target.value as string)}
                required
                sx={{ width: "95%" }}
                multiline
                autoComplete="off"
                autoFocus
                margin="dense"
                id="name"
                label="Link"
                type="text"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ ...styles.containedButtonWhite, background: "white", color: "black" }}
                onClick={() => {
                  setProblem({
                    id: -1,
                    name: "",
                    difficulty: "",
                    notes: "",
                    tags: "",
                    status: "",
                    link: "",
                  });
                  setAddDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" sx={{ ...styles.containedButtonBlack, marginLeft: 3 }} onClick={handleProblemSubmit}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
            <Autocomplete
              sx={{ width: 400 }}
              options={allProblems}
              getOptionLabel={(option) => option.title}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => <TextField {...params} label="Problem Name" variant="standard" />}
            />
          </Dialog>
        </>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row", width: "80vw", justifyContent: "space-around" }}>
            <Card sx={{ minWidth: "35%", maxWidth: "40%" }}>
              <CardHeader title="Completed Problems" />
              <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Box
                  sx={{
                    outline: "solid",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    outlineColor: "gray",
                    borderRadius: "50%",
                    width: "10em",
                    height: "10em",
                    marginRight: 10,
                  }}
                >
                  <Typography variant="h5">{data.length}</Typography>
                  <Typography variant="h5">Completed</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontSize={"1.3em"} component="div">
                    Easy {completedProblems.Easy}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="success" value={(completedProblems.Easy / data.length) * 100} />
                  <Typography fontSize={"1.3em"} component="div">
                    Medium {completedProblems.Medium}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="warning" value={(completedProblems.Medium / data.length) * 100} />
                  <Typography fontSize={"1.3em"} component="div">
                    Hard {completedProblems.Hard}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="error" value={(completedProblems.Hard / data.length) * 100} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: "35%", maxWidth: "40%" }}>
              <CardHeader title="Common Topics" />
              <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontSize={"1.3em"} component="div">
                    Easy {completedProblems.Easy}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="success" value={(completedProblems.Easy / data.length) * 100} />
                  <Typography fontSize={"1.3em"} component="div">
                    Medium {completedProblems.Medium}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="warning" value={(completedProblems.Medium / data.length) * 100} />
                  <Typography fontSize={"1.3em"} component="div">
                    Hard {completedProblems.Hard}
                  </Typography>
                  <LinearProgress variant="determinate" sx={{ height: 10, width: "100%", borderRadius: 30 }} color="error" value={(completedProblems.Hard / data.length) * 100} />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box> 3</Box>
        </Box>
      )}
      <Snackbar
        onClose={() => {
          setValidActionSnackbar([false, ""]);
          if (validActionSnackbar[1] === "You are unauthorized to make this action. Redirecting you.") {
            handleNavigate("login");
          }
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={validActionSnackbar[0]}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {validActionSnackbar[1]}
        </Alert>
      </Snackbar>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

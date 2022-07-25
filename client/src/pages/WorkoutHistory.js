import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import WorkoutHistorySetRow from "../components/WorkoutHistorySetRow";
import { useNavigate } from "react-router-dom";

const style = {
  container: {
    paddingBottom: "20px",
    maxWidth: "1200px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    position: "relative",
    backgroundColor: "white",
    boxShadow: 24,
    padding: 40,
    minWidth: 300,
  },
  chip: {
    margin: 10,
  },
  list: {
    maxHeight: "80vh",
    overflow: "auto",
  },
  add: {
    marginLeft: "80%",
  },
  button: {
    margin: "5px 0",
  },
  cancel: {
    margin: "15px 0",
  },
};

const WorkoutHistory = () => {
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([]);
  const [chosedExercise, setChosedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [bestResult, setBestResult] = useState();
  const navigate = useNavigate();

  const getWorkoutHistory = () => {
    const getData = window.localStorage.getItem("userInfo");
    const { workoutsArr } = JSON.parse(getData);
    let setsArr = [];

    setWorkoutsFromDb(workoutsArr);

    workoutsArr.forEach((item) => {
      const { timestamp } = item;
      const date = new Date(timestamp).toLocaleDateString();
      const { sets } =
        item.finishedExercises.find(({ name }) => name === chosedExercise) ||
        {};

      if (sets) {
        sets.forEach((set) => {
          const { kg, reps } = set;
          const setObj = { date, kg: "", reps: "" };

          setObj.kg = parseInt(kg);
          setObj.reps = parseInt(reps);
          setsArr.push(setObj);
        });
      }
    });

    setExerciseSets(setsArr || []);
  };

  const getExercises = () => {
    let result = [];
    workoutsFromDb.forEach((item) => {
      item.finishedExercises.map(({ name }) => {
        result.push(name);
      });
    });

    const removeDuplicates = result.filter((v, i, a) => a.indexOf(v) == i);

    setExerciseArr(removeDuplicates);
  };

  const handleClick = (label) => {
    setExerciseSets([]);
    setChosedExercise(label);
  };

  const getBestResult = () => {
    const max = exerciseSets.reduce((a, b) => (a.kg > b.kg ? a : b)).kg;
    setBestResult(max);
  };

  useEffect(() => {
    getWorkoutHistory();
  }, []);

  useEffect(() => {
    getWorkoutHistory();
  }, [chosedExercise]);

  useEffect(() => {
    exerciseSets.length > 1 && getBestResult();
  }, [exerciseSets]);

  useEffect(() => {
    getExercises();
  }, [workoutsFromDb]);

  return (
    <Container style={style.container} component="main" maxWidth="xs">
      <h1>Your Exercises</h1>
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {exerciseArr &&
          exerciseArr.map((item, index) => {
            return (
              <Chip
                key={index}
                onClick={(e) => handleClick(e.target.innerText)}
                label={item}
                variant="outlined"
                sx={{ margin: "10px" }}
              />
            );
          })}
      </Stack>
      <h1>{chosedExercise}</h1>
      <h3>Best: {bestResult}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e5e5e5" }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>KG</TableCell>
              <TableCell>REPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exerciseSets &&
              exerciseSets.map((item, index) => {
                const { kg, reps, date } = item;

                return (
                  <WorkoutHistorySetRow
                    kg={kg}
                    reps={reps}
                    date={date}
                    key={index}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default WorkoutHistory;

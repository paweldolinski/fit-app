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

const Workout = () => {
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([]);
  const [chosedExercise, setChosedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);

  const getWorkoutHistory = () => {
    const getData = window.localStorage.getItem("workoutsArr");
    const dataArr = JSON.parse(getData);

    setWorkoutsFromDb(dataArr);

    // const workout = {
    //   name: chosedExercise,
    //   sets: [],
    // };

    dataArr.forEach((item) => {
      const { sets } =
        item.finishedExercises.find(({ name }) => name === chosedExercise) ||
        {};
      if (sets) {
        console.log(sets, "sets");
        setExerciseSets(sets);
      }
    });
  };

  const getExercises = () => {
    let result = [];
    workoutsFromDb.forEach((item) => {
      item.finishedExercises.map(({ name }) => {
        // setExerciseArr((exerciseArr) => [...exerciseArr, name]);
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

  useEffect(() => {
    getWorkoutHistory();
  }, []);

  useEffect(() => {
    getWorkoutHistory();
  }, [chosedExercise]);

  useEffect(() => {
    getExercises();
  }, [workoutsFromDb]);

  return (
    <Container style={style.container} component="main" maxWidth="xs">
      <h1>Your Exercises</h1>
      {/* {console.log(chosedExercise)}
      {console.log(exerciseArr)} */}
      {console.log("exerciseSets: ", exerciseSets)}

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">{chosedExercise}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exerciseSets &&
              exerciseSets.map((item) => {
                const { kg, reps } = item;
                console.log(kg, reps);
                return <WorkoutHistorySetRow kg={item.kg} reps={item.reps} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Workout;

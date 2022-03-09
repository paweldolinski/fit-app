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
  Button
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

  const showLocal = () => {
    console.log(
      JSON.parse(window.localStorage.getItem("workoutsArr")),
      "from local"
    );
  };

  const getWorkoutHistory = () => {
    const getData = window.localStorage.getItem("workoutsArr");
    const dataArr = JSON.parse(getData);
    let setsArr = [];

    setWorkoutsFromDb(dataArr);

    // const workout = {
    //   name: chosedExercise,
    //   sets: [],
    // };

    dataArr.forEach((item) => {
      const { timestamp } = item;
      const date = new Date(timestamp).toLocaleDateString();
      console.log(item, "item");
      const { sets } =
        item.finishedExercises.find(({ name }) => name === chosedExercise) ||
        {};

      if (sets) {
        sets.forEach((set) => {
          const { kg, reps } = set;
          const setObj = { date, kg: "", reps: "" };

          setObj.kg = kg;
          setObj.reps = reps;
          setsArr.push(setObj);
        });
      }
    });

    setExerciseSets(setsArr);

    console.log(exerciseSets, "exerciseSets");
    console.log(setsArr, "setsArr");
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
      <h1>{chosedExercise}</h1>
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
              exerciseSets.map((item) => {
                const { kg, reps, date } = item;

                return <WorkoutHistorySetRow kg={kg} reps={reps} date={date} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={showLocal}>
        Show local
      </Button>
    </Container>
  );
};

export default Workout;

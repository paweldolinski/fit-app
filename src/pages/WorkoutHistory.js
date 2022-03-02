import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

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

  const getWorkoutHistory = () => {
    const getData = window.localStorage.getItem("workoutsArr");
    const dataArr = JSON.parse(getData);

    setWorkoutsFromDb(dataArr);

    // const workout = {
    //   name: "Bench Press (Barbell)",
    //   sets: [],
    // };
    //
    // dataArr.forEach((item) => {
    //   const { sets } =
    //     item.finishedExercises.find(({ name }) => name === workout.name) || {};
    //   if (sets) {
    //     workout.sets = [...workout.sets, ...sets];
    //   }
    // });
    //
    // console.log("workout", workout);
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

    console.log(removeDuplicates);

    setExerciseArr(removeDuplicates);
  };

  const handleClick = (label) => {
    setChosedExercise(label);
  };

  useEffect(() => {
    getWorkoutHistory();
  }, []);

  useEffect(() => {
    getExercises();
  }, [workoutsFromDb]);

  return (
    <Container style={style.container} component="main" maxWidth="xs">
      <h1>Your Exercises</h1>
      {console.log(chosedExercise)}
      {console.log(exerciseArr)}

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

      {chosedExercise}

      {/*<TableContainer component={Paper}>*/}
      {/*  <Table>*/}
      {/*    <TableHead>*/}
      {/*      <TableRow>*/}
      {/*        <TableCell align="center">NAME</TableCell>*/}
      {/*      </TableRow>*/}
      {/*    </TableHead>*/}
      {/*    <TableBody>*/}
      {/*      /!*{workoutsHistory &&*!/*/}
      {/*      /!*  workoutsHistory.map((row, index) => (*!/*/}
      {/*      /!*    <WorkoutHistoryItem key={index} />*!/*/}
      {/*      /!*  ))}*!/*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</TableContainer>*/}
    </Container>
  );
};

export default Workout;

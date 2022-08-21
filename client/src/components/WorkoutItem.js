import * as React from "react";
import {
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import WorkoutSetRow from "./WorkoutSetRow";
import { WorkoutContext } from "../context/workoutContext";
import { MoreVert } from "@mui/icons-material";
import SeeMoreDialog from "./SeeMoreDialog";
import { getItemFromLocalstorage } from "../Utiles/localStorage";

const style = {
  wrapper: {
    marginBottom: "20px",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textField: {
    margin: "20px 10px 20px 0",
  },
};

const WorkoutItem = ({ exercise, checkIsEmptySetInAllSets }) => {
  const { name, sets } = exercise;
  const { updateExercise } = useContext(WorkoutContext);
  const [setsArr, setSetsArr] = useState(sets);
  const [prevSets, setPrevSets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addSet = () => {
    setSetsArr([...setsArr, { id: setsArr.length, kg: "", reps: "" }]);
    checkIsEmptySetInAllSets();
  };

  const removeSet = (id) => {
    const result = setsArr.filter((set) => set.id !== id);
    setSetsArr(result);
  };

  const onChange = (e) => {
    const value = e.target.value;
    const unit = e.target.name;
    const id = parseInt(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );

    const setValues = setsArr.map((item) => {
      if (id === item.id) {
        item[unit] = value;
      }
      return item;
    });
    updateExercise(setValues, name);
    checkIsEmptySetInAllSets();
  };

  const checkPrev = () => {
    const workouts = getItemFromLocalstorage("userInfo").workoutsArr;
    let lastWorkout = [];

    workouts.map((workout) => {
      workout.finishedExercises.map((exercise) => {
        if (exercise.name === name) {
          lastWorkout.push(exercise);
        }
      });
    });

    if (lastWorkout.length > 0) {
      setPrevSets(lastWorkout.at(-1).sets);
    }
  };

  const getPrev = (index) => {
    let previousSet;

    prevSets.filter((prev) => {
      if (prev.id === index) {
        previousSet = `${prev.kg} x ${prev.reps}`;
      }
    });

    return previousSet;
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    checkPrev();
  }, []);

  useEffect(() => {
    updateExercise(setsArr, name);
  }, [setsArr]);

  return (
    <div style={style.wrapper}>
      <div style={style.div}>
        <h3>{name}</h3>
        <IconButton onClick={handleClickOpen}>
          <MoreVert />
        </IconButton>
        <SeeMoreDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          isOpen={isOpen}
          name={name}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SET</TableCell>
              <TableCell align="center">PREVIOUS</TableCell>
              <TableCell align="center">KG</TableCell>
              <TableCell align="center">REPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {setsArr &&
              setsArr.map((row, index) => (
                <WorkoutSetRow
                  id={index}
                  onChange={onChange}
                  key={index}
                  index={index}
                  row={row}
                  name={name}
                  prev={getPrev(index)}
                  removeSet={removeSet}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={addSet}>
        Add Set
      </Button>
    </div>
  );
};

export default WorkoutItem;

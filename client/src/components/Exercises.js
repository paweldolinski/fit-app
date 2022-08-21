import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";

const Exercises = ({ item, isExerciseChosed }) => {
  const [isChecked, setIsChecked] = useState(isExerciseChosed);
  const { addExercise, removeExercise } = useContext(WorkoutContext);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton
        onClick={() => {
          toggleChecked();
          isChecked ? removeExercise(item) : addExercise(item);
        }}
      >
        <ListItemIcon>{isChecked && <CheckCircleIcon />}</ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  );
};

export default Exercises;

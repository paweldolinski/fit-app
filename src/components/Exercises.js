import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import { useContext, useState } from "react";
import { WorkoutContext } from "../context/workoutContext";

const Exercises = ({ item }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { addExercise, filteredExercise } = useContext(WorkoutContext);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton
        onClick={() => {
          toggleChecked();
          addExercise(item);
        }}
      >
        <ListItemIcon>{isChecked && <CheckCircleIcon />}</ListItemIcon>
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  );
};

export default Exercises;

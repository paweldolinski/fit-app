import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import { useState } from "react";

const Exercises = ({ addExercise, item }) => {
  const [isChecked, setIsChecked] = useState(false);
  const clickHandle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ListItem component="div" disablePadding>
      <ListItemButton
        onClick={() => {
          clickHandle();
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

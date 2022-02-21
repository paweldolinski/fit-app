import * as React from "react";
import { TextField, TableRow, TableCell } from "@mui/material";
import { WorkoutContext } from "../context/workoutContext";
import { useContext, useEffect, useState } from "react";

const style = {
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    margin: "20px 10px 20px 0",
  },
};

const WorkoutSetRow = ({ index, onChange, prev }) => {
  const setDisabel = () => {};
  return (
    <TableRow>
      {console.log(prev)}
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <p>{prev ? prev : "-"}</p>
      </TableCell>
      <TableCell>
        <TextField
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          variant="outlined"
          name="kg"
          data-id={index}
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          variant="outlined"
          name="reps"
          data-id={index}
        />
      </TableCell>
    </TableRow>
  );
};

export default WorkoutSetRow;

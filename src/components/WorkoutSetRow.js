import * as React from "react";
import {
  TextField,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  Table,
} from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";

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

const WorkoutSetRow = ({ index, onChange }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <TextField
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          label="-"
          variant="outlined"
          disabled
          name="previous"
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          variant="outlined"
          name="kg"
        />
      </TableCell>
      <TableCell>
        <TextField
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          variant="outlined"
          name="reps"
        />
      </TableCell>
    </TableRow>
  );
};

export default WorkoutSetRow;

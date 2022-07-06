import * as React from "react";
import { TextField, TableRow, TableCell } from "@mui/material";

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

const WorkoutHistorySetRow = ({ kg, reps, date }) => {
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{kg}</TableCell>
      <TableCell>{reps}</TableCell>
    </TableRow>
  );
};

export default WorkoutHistorySetRow;

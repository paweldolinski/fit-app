import * as React from "react";
import { TableRow, TableCell } from "@mui/material";

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

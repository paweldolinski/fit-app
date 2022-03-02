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

const WorkoutHistoryItem = ({ index, onChange, prev }) => {
  return (
    <TableRow>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default WorkoutHistoryItem;

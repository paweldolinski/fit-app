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

const WorkoutSetRow = ({ index, onChange, prev }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <p>{prev ? prev : "-"}</p>
      </TableCell>
      <TableCell>
        <TextField
          inputProps={{ style: { padding: 5, border: "none" } }}
          type="number"
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
          inputProps={{ style: { padding: 5, border: "none" } }}
          type="number"
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

import * as React from "react";
import { TextField, TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

const WorkoutSetRow = ({ index, onChange, prev, removeSet }) => {
  const setNumberSet = () => {
    return index + 1;
  };

  return (
    <TableRow>
      <TableCell>{setNumberSet()}</TableCell>
      <TableCell>
        <p>{prev ? prev : "-"}</p>
      </TableCell>
      <TableCell>
        <TextField
          inputProps={{
            style: {
              padding: 5,
              border: "none",
            },
          }}
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
          inputProps={{
            style: {
              padding: 5,
              border: "none",
            },
          }}
          type="number"
          onChange={onChange}
          style={style.textField}
          id="outlined-basic"
          variant="outlined"
          name="reps"
          data-id={index}
        />
      </TableCell>
      {index > 0 && (
        <TableCell>
          <IconButton data-id={index} onClick={() => removeSet(index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default WorkoutSetRow;

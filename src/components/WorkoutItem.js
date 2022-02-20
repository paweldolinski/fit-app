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
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import WorkoutSetRow from "./WorkoutSetRow";
import { UserContext } from "../context/userContext";

const style = {
  header: {},
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    margin: "20px 10px 20px 0",
  },
};

const WorkoutItem = ({ exercise, updateExercise }) => {
  const { name, sets } = exercise;
  const [setsArr, setSetsArr] = useState(sets);

  const addSet = () => {
    setSetsArr([...setsArr, { id: setsArr.length, kg: "", reps: "" }]);
  };

  const onChange = (e) => {
    const value = e.target.value;
    const unit = e.target.name;
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    const test = setsArr.map((item) => {
      if (id == item.id) {
        item[unit] = value;
      }
      return item;
    });
    // setSetsArr(test);
    updateExercise(test, name);
  };

  return (
    <div>
      <h3>{name}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SET</TableCell>
              <TableCell align="center">PREVIOUS</TableCell>
              <TableCell align="center">KG</TableCell>
              <TableCell align="center">REPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {setsArr &&
              setsArr.map((row, index) => (
                <WorkoutSetRow
                  id={index}
                  onChange={onChange}
                  key={index}
                  index={index}
                  row={row}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addSet}>Add Set</Button>
    </div>
  );
};

export default WorkoutItem;

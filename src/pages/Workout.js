import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { List, Modal } from "@mui/material";
import Exercises from "../components/Exercises";
import WorkoutItem from "../components/WorkoutItem";
import { UserContext } from "../context/userContext";

const style = {
  container: {
    border: "solid black 2px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    position: "relative",
    backgroundColor: "white",
    boxShadow: 24,
    padding: 40,
    height: "80vh",
    minWidth: 300,
  },
  stack: {},
  chip: {
    margin: 10,
  },
  add: {
    marginLeft: "80%",
  },
};

const Workout = () => {
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [filteredExercise, setFilteredExercise] = useState([]);
  const exercises = [
    "Bench press",
    "Bench press dumbbell",
    "Bicep Curl",
    "Bicep Curl dumbbell",
    "Squat",
    "Chest fly",
    "Deadlift",
    "Lat Pulldown",
  ];

  const handleOpenWorkout = () => {
    setIsWorkoutModalOpen(true);
  };
  const handleCloseWorkout = () => {
    setIsWorkoutModalOpen(false);
  };
  const createWorkoutExercises = () => {
    setIsWorkoutModalOpen(false);
  };
  const addExercise = (exercise) => {
    setFilteredExercise([
      ...filteredExercise,
      {
        name: exercise,
        isChosed: true,
        sets: [{ id: 0, kg: "", reps: "" }],
      },
    ]);
  };

  const updateExercise = (sets, name) => {
    const exercises = filteredExercise.map((item) => {
      if (item.name === name) {
        item.sets = sets;
      }
      return item;
    });

    setFilteredExercise(exercises);
  };

  return (
    <Container style={style.container} component="main" maxWidth="xs">
      {filteredExercise.length === 0 && (
        <Button onClick={handleOpenWorkout}>Start an empty Workout</Button>
      )}
      <Modal
        style={style.modal}
        open={isWorkoutModalOpen}
        onClose={handleCloseWorkout}
      >
        <Box style={style.box}>
          <h2>Choose Exercise</h2>
          <List>
            {exercises &&
              exercises.map((item, index) => {
                return (
                  <Exercises
                    addExercise={addExercise}
                    filteredExercise={filteredExercise}
                    key={index}
                    item={item}
                  />
                );
              })}
          </List>

          {console.log("filtered: ", filteredExercise)}

          {filteredExercise.length > 0 && (
            <Button onClick={createWorkoutExercises} style={style.add}>
              Add
            </Button>
          )}
        </Box>
      </Modal>
      {filteredExercise.length > 0 &&
        filteredExercise.map((item, index) => {
          if (item.isChosed) {
            return (
              <WorkoutItem
                key={index}
                index={index + 1}
                exercise={item}
                updateExercise={updateExercise}
              />
            );
          }
        })}
      {filteredExercise.length > 0 && (
        <Button onClick={updateExercise}>Finish workout</Button>
      )}
    </Container>
  );
};

export default Workout;

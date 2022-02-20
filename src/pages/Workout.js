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
  const [filteredExercised, setFilteredExercised] = useState([]);
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
    setFilteredExercised([
      ...filteredExercised,
      {
        name: exercise,
        isChosed: true,
        sets: [{ kg: "", reps: "" }],
      },
    ]);
  };

  const addSet = (exercise) => {
    filteredExercised.map((item) => {
      if (item.name === exercise) {
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            item.sets.concat({ tes: "test" });
            console.log(item.sets);
          }
        }
      }
    });
  };

  return (
    <Container style={style.container} component="main" maxWidth="xs">
      {filteredExercised.length === 0 && (
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
                    filteredExercised={filteredExercised}
                    key={index}
                    item={item}
                  />
                );
              })}
          </List>

          {filteredExercised.length > 0 && (
            <Button onClick={createWorkoutExercises} style={style.add}>
              Add
            </Button>
          )}
        </Box>
      </Modal>
      {filteredExercised.length > 0 &&
        filteredExercised.map((item, index) => {
          if (item.isChosed) {
            return (
              <WorkoutItem
                addSet={addSet}
                key={index}
                index={index + 1}
                exercise={item}
              />
            );
          }
        })}
      {filteredExercised.length > 0 && (
        <Button
          onClick={() => {
            console.log(filteredExercised);
          }}
        >
          Finish workout
        </Button>
      )}
    </Container>
  );
};

export default Workout;

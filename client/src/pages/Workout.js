import Box from "@mui/material/Box";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { IconButton, List, Modal, TextField } from "@mui/material";
import Exercises from "../components/Exercises";
import WorkoutItem from "../components/WorkoutItem";
import { WorkoutContext } from "../context/workoutContext";
import ConfirmDialog from "../components/ConfirmDialog";
import BasicDialog from "../components/BasicDialog";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  container: {
    paddingBottom: "20px",
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
    minWidth: 300,
  },
  chip: {
    margin: 10,
  },
  list: {
    maxHeight: "80vh",
    overflow: "auto",
  },
  add: {
    marginLeft: "80%",
  },
  button: {
    margin: "5px 0",
  },
  cancel: {
    margin: "15px 0",
  },
};

const Workout = () => {
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isFinishWorkoutDialogOpen, setIsFinishWorkoutDialogOpen] =
    useState(false);
  const [isCancelWorkoutDialogOpen, setIsCancelWorkoutDialogOpen] =
    useState(false);
  const [isEmptySetDialogOpen, setIsEmptySetDialogOpen] = useState(false);
  const [timestamp, setTimeStamp] = useState();
  const {
    exercises,
    setWorkouts,
    filteredExercise,
    cancelWorkout,
    setWorkoutTitle,
    finishWorkout,
    isEmptySet,
    checkIfEmptySet,
  } = useContext(WorkoutContext);

  const handleOpenWorkout = () => {
    setWorkouts([]);
    setIsWorkoutModalOpen(true);
  };

  const handleCloseWorkout = () => {
    setIsWorkoutModalOpen(false);
  };

  const createWorkoutExercises = () => {
    setIsWorkoutModalOpen(false);
  };

  const checkWorkout = () => {
    filteredExercise.length > 0
      ? setIsWorkoutStarted(true)
      : setIsWorkoutStarted(false);
  };

  const checkIsEmptySetInAllSets = () => {
    const checkIsEmptySetInAllSets = [];

    filteredExercise &&
      filteredExercise.map((exercise) =>
        exercise.sets.map((set) => checkIsEmptySetInAllSets.push(set))
      );

    checkIfEmptySet(checkIsEmptySetInAllSets);
  };

  const isExerciseChosed = (exercise) =>
    filteredExercise.some((item) => item.name === exercise);

  useEffect(() => {
    checkWorkout();
    console.log(filteredExercise, "filtered");
  }, [filteredExercise.length]);

  useEffect(() => {
    checkIsEmptySetInAllSets();
  });

  return (
    <Container style={style.container} component="main" maxWidth="md">
      {filteredExercise.length === 0 && (
        <Button fullWidth variant="contained" onClick={handleOpenWorkout}>
          Start an empty Workout
        </Button>
      )}
      <Modal
        style={style.modal}
        open={isWorkoutModalOpen}
        onClose={handleCloseWorkout}
      >
        <Box style={style.box}>
          <TextField
            inputProps={{ style: { padding: 5, border: "none" } }}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            id="outlined-basic"
            variant="filled"
            name="Title"
            placeholder="Title: "
          />
          <IconButton onClick={handleCloseWorkout}>
            <CloseIcon />
          </IconButton>
          <h2>Choose Exercise</h2>
          <List style={style.list}>
            {exercises &&
              exercises.map((item, index) => {
                return (
                  <Exercises
                    isExerciseChosed={isExerciseChosed(item)}
                    key={index}
                    item={item}
                  />
                );
              })}
          </List>
          {isWorkoutStarted && (
            <Button
              variant="contained"
              onClick={createWorkoutExercises}
              style={style.add}
            >
              Add
            </Button>
          )}
        </Box>
      </Modal>
      {isWorkoutStarted &&
        !isWorkoutModalOpen &&
        filteredExercise
          .sort()
          .map((item, index) => (
            <WorkoutItem
              key={index}
              index={index + 1}
              exercise={item}
              checkIsEmptySetInAllSets={checkIsEmptySetInAllSets}
            />
          ))}
      {isWorkoutStarted && !isWorkoutModalOpen && (
        <>
          <Button
            style={style.button}
            fullWidth
            variant="contained"
            onClick={handleOpenWorkout}
          >
            Add exercise
          </Button>
          <Button
            style={style.button}
            sx={{ bgcolor: "success.main" }}
            fullWidth
            variant="contained"
            onClick={() =>
              isEmptySet
                ? setIsEmptySetDialogOpen(true)
                : setIsFinishWorkoutDialogOpen(true)
            }
          >
            Finish workout
          </Button>
          <ConfirmDialog
            open={isFinishWorkoutDialogOpen}
            setOpen={setIsFinishWorkoutDialogOpen}
            onConfirm={finishWorkout}
          >
            Do You want to finish workout ??
          </ConfirmDialog>
          <BasicDialog
            open={isEmptySetDialogOpen}
            setOpen={setIsEmptySetDialogOpen}
          >
            You have empty set, fill with data or remove
          </BasicDialog>
          <Button
            style={style.cancel}
            sx={{ bgcolor: "error.main" }}
            fullWidth
            variant="contained"
            onClick={() => setIsCancelWorkoutDialogOpen(true)}
          >
            Cancel workout
          </Button>

          <ConfirmDialog
            open={isCancelWorkoutDialogOpen}
            setOpen={setIsCancelWorkoutDialogOpen}
            onConfirm={cancelWorkout}
          >
            Do You want to cancel workout ??
          </ConfirmDialog>
        </>
      )}
    </Container>
  );
};

export default Workout;

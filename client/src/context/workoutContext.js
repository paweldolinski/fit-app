import React, { createContext, useEffect, useState } from "react";
import {
  getPreWorkoutFromLocal,
  getTimestampToLocalStorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  resetTimestampToLocalStorage,
  setPreWorkoutsArrayToLocal,
  setUserInfoToLocalStorage,
} from "../utils/localStorage";

export const WorkoutContext = createContext();

const newExercisesArray = [
  {
    label: "Bar Dip",
    value: "Bar Dip",
    category: "chest",
  },
  {
    label: "Bench Press",
    value: "Bench Press",
    category: "chest",
  },
  {
    label: "Cable Chest Press",
    value: "Cable Chest Press",
    category: "chest",
  },
  {
    label: "Close-Grip Bench Press",
    value: "Close-Grip Bench Press",
    category: "chest",
  },
  {
    label: "Close-Grip Feet-Up Bench Press",
    value: "Close-Grip Feet-Up Bench Press",
    category: "chest",
  },
  {
    label: "Decline Bench Press",
    value: "Decline Bench Press",
    category: "chest",
  },
  {
    label: "Dumbbell Chest Fly",
    value: "Dumbbell Chest Fly",
    category: "chest",
  },
  {
    label: "Dumbbell Chest Press",
    value: "Dumbbell Chest Press",
    category: "chest",
  },
  {
    label: "Dumbbell Decline Chest Press",
    value: "Dumbbell Decline Chest Press",
    category: "chest",
  },
  {
    label: "Dumbbell Floor Press",
    value: "Dumbbell Floor Press",
    category: "chest",
  },
  {
    label: "Dumbbell Pullover",
    value: "Dumbbell Pullover",
    category: "chest",
  },
  {
    label: "Feet-Up Bench Press",
    value: "Feet-Up Bench Press",
    category: "chest",
  },
  {
    label: "Floor Press",
    value: "Floor Press",
    category: "chest",
  },
  {
    label: "Incline Bench Press",
    value: "Incline Bench Press",
    category: "chest",
  },
  {
    label: "Incline Dumbbell Press",
    value: "Incline Dumbbell Press",
    category: "chest",
  },
  {
    label: "Incline Push-Up",
    value: "Incline Push-Up",
    category: "chest",
  },
  {
    label: "Kneeling Incline Push-Up",
    value: "Kneeling Incline Push-Up",
    category: "chest",
  },
  {
    label: "Kneeling Push-Up",
    value: "Kneeling Push-Up",
    category: "chest",
  },
  {
    label: "Machine Chest Fly",
    value: "Machine Chest Fly",
    category: "chest",
  },
  {
    label: "Machine Chest Press",
    value: "Machine Chest Press",
    category: "chest",
  },
  {
    label: "Pec Deck",
    value: "Pec Deck",
    category: "chest",
  },
  {
    label: "Push-Up",
    value: "Push-Up",
    category: "chest",
  },
  {
    label: "Push-Up Against Wall",
    value: "Push-Up Against Wall",
    category: "chest",
  },
  {
    label: "Push-Ups With Feet in Rings",
    value: "Push-Ups With Feet in Rings",
    category: "chest",
  },
  {
    label: "Resistance Band Chest Fly",
    value: "Resistance Band Chest Fly",
    category: "chest",
  },
  {
    label: "Smith Machine Bench Press",
    value: "Smith Machine Bench Press",
    category: "chest",
  },
  {
    label: "Smith Machine Incline Bench Press",
    value: "Smith Machine Incline Bench Press",
    category: "chest",
  },
  {
    label: "Standing Cable Chest Fly",
    value: "Standing Cable Chest Fly",
    category: "chest",
  },
  {
    label: "Standing Resistance Band Chest Fly",
    value: "Standing Resistance Band Chest Fly",
    category: "chest",
  },
  {
    label: "Band External Shoulder Rotation",
    value: "Band External Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Band Internal Shoulder Rotation",
    value: "Band Internal Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Band Pull-Apart",
    value: "Band Pull-Apart",
    category: "shoulder",
  },
  {
    label: "Barbell Front Raise",
    value: "Barbell Front Raise",
    category: "shoulder",
  },
  {
    label: "Barbell Rear Delt Row",
    value: "Barbell Rear Delt Row",
    category: "shoulder",
  },
  {
    label: "Barbell Upright Row",
    value: "Barbell Upright Row",
    category: "shoulder",
  },
  {
    label: "Behind the Neck Press",
    value: "Behind the Neck Press",
    category: "shoulder",
  },
  {
    label: "Cable Lateral Raise",
    value: "Cable Lateral Raise",
    category: "shoulder",
  },
  {
    label: "Cable Rear Delt Row",
    value: "Cable Rear Delt Row",
    category: "shoulder",
  },
  {
    label: "Dumbbell Front Raise",
    value: "Dumbbell Front Raise",
    category: "shoulder",
  },
  {
    label: "Dumbbell Horizontal Internal Shoulder Rotation",
    value: "Dumbbell Horizontal Internal Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Dumbbell Horizontal External Shoulder Rotation",
    value: "Dumbbell Horizontal External Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Dumbbell Lateral Raise",
    value: "Dumbbell Lateral Raise",
    category: "shoulder",
  },
  {
    label: "Dumbbell Rear Delt Row",
    value: "Dumbbell Rear Delt Row",
    category: "shoulder",
  },
  {
    label: "Dumbbell Shoulder Press",
    value: "Dumbbell Shoulder Press",
    category: "shoulder",
  },
  {
    label: "Face Pull",
    value: "Face Pull",
    category: "shoulder",
  },
  {
    label: "Front Hold",
    value: "Front Hold",
    category: "shoulder",
  },
  {
    label: "Lying Dumbbell External Shoulder Rotation",
    value: "Lying Dumbbell External Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Lying Dumbbell Internal Shoulder Rotation",
    value: "Lying Dumbbell Internal Shoulder Rotation",
    category: "shoulder",
  },
  {
    label: "Machine Lateral Raise",
    value: "Machine Lateral Raise",
    category: "shoulder",
  },
  {
    label: "Machine Shoulder Press",
    value: "Machine Shoulder Press",
    category: "shoulder",
  },
  {
    label: "Monkey Row",
    value: "Monkey Row",
    category: "shoulder",
  },
  {
    label: "Overhead Press",
    value: "Overhead Press",
    category: "shoulder",
  },
  {
    label: "Plate Front Raise",
    value: "Plate Front Raise",
    category: "shoulder",
  },
  {
    label: "Power Jerk",
    value: "Power Jerk",
    category: "shoulder",
  },
  {
    label: "Push Press",
    value: "Push Press",
    category: "shoulder",
  },
  {
    label: "Reverse Dumbbell Flyes",
    value: "Reverse Dumbbell Flyes",
    category: "shoulder",
  },
  {
    label: "Reverse Machine Fly",
    value: "Reverse Machine Fly",
    category: "shoulder",
  },
  {
    label: "Seated Dumbbell Shoulder Press",
    value: "Seated Dumbbell Shoulder Press",
    category: "shoulder",
  },
  {
    label: "Seated Barbell Overhead Press",
    value: "Seated Barbell Overhead Press",
    category: "shoulder",
  },
  {
    label: "Seated Smith Machine Shoulder Press",
    value: "Seated Smith Machine Shoulder Press",
    category: "shoulder",
  },
  {
    label: "Snatch Grip Behind the Neck Press",
    value: "Snatch Grip Behind the Neck Press",
    category: "shoulder",
  },
  {
    label: "Squat Jerk",
    value: "Squat Jerk",
    category: "shoulder",
  },
  {
    label: "Split Jerk",
    value: "Split Jerk",
    category: "shoulder",
  },
  {
    label: "Barbell Curl",
    value: "Barbell Curl",
    category: "biceps",
  },
  {
    label: "Barbell Preacher Curl",
    value: "Barbell Preacher Curl",
    category: "biceps",
  },
  {
    label: "Bodyweight Curl",
    value: "Bodyweight Curl",
    category: "biceps",
  },
  {
    label: "Cable Curl With Bar",
    value: "Cable Curl With Bar",
    category: "biceps",
  },
  {
    label: "Cable Curl With Rope",
    value: "Cable Curl With Rope",
    category: "biceps",
  },
  {
    label: "Concentration Curl",
    value: "Concentration Curl",
    category: "biceps",
  },
  {
    label: "Dumbbell Curl",
    value: "Dumbbell Curl",
    category: "biceps",
  },
  {
    label: "Dumbbell Preacher Curl",
    value: "Dumbbell Preacher Curl",
    category: "biceps",
  },
  {
    label: "Hammer Curl",
    value: "Hammer Curl",
    category: "biceps",
  },
  {
    label: "Incline Dumbbell Curl",
    value: "Incline Dumbbell Curl",
    category: "biceps",
  },
  {
    label: "Machine Bicep Curl",
    value: "Machine Bicep Curl",
    category: "biceps",
  },
  {
    label: "Spider Curl",
    value: "Spider Curl",
    category: "biceps",
  },
  {
    label: "Barbell Standing Triceps Extension",
    value: "Barbell Standing Triceps Extension",
    category: "triceps",
  },
  {
    label: "Barbell Lying Triceps Extension",
    value: "Barbell Lying Triceps Extension",
    category: "triceps",
  },
  {
    label: "Bench Dip",
    value: "Bench Dip",
    category: "triceps",
  },
  {
    label: "Close-Grip Push-Up",
    value: "Close-Grip Push-Up",
    category: "triceps",
  },
  {
    label: "Dumbbell Lying Triceps Extension",
    value: "Dumbbell Lying Triceps Extension",
    category: "triceps",
  },
  {
    label: "Dumbbell Standing Triceps Extension",
    value: "Dumbbell Standing Triceps Extension",
    category: "triceps",
  },
  {
    label: "Overhead Cable Triceps Extension",
    value: "Overhead Cable Triceps Extension",
    category: "triceps",
  },
  {
    label: "Tricep Bodyweight Extension",
    value: "Tricep Bodyweight Extension",
    category: "triceps",
  },
  {
    label: "Tricep Pushdown With Bar",
    value: "Tricep Pushdown With Bar",
    category: "triceps",
  },
  {
    label: "Tricep Pushdown With Rope",
    value: "Tricep Pushdown With Rope",
    category: "triceps",
  },

  {
    label: "Air Squat",
    value: "Air Squat",
    category: "legs",
  },
  {
    label: "Barbell Hack Squat",
    value: "Barbell Hack Squat",
    category: "legs",
  },
  {
    label: "Barbell Lunge",
    value: "Barbell Lunge",
    category: "legs",
  },
  {
    label: "Barbell Walking Lunge",
    value: "Barbell Walking Lunge",
    category: "legs",
  },
  {
    label: "Belt Squat",
    value: "Belt Squat",
    category: "legs",
  },
  {
    label: "Body Weight Lunge",
    value: "Body Weight Lunge",
    category: "legs",
  },
  {
    label: "Box Squat",
    value: "Box Squat",
    category: "legs",
  },
  {
    label: "Bulgarian Split Squat",
    value: "Bulgarian Split Squat",
    category: "legs",
  },
  {
    label: "Chair Squat",
    value: "Chair Squat",
    category: "legs",
  },
  {
    label: "Dumbbell Lunge",
    value: "Dumbbell Lunge",
    category: "legs",
  },
  {
    label: "Dumbbell Squat",
    value: "Dumbbell Squat",
    category: "legs",
  },
  {
    label: "Front Squat",
    value: "Front Squat",
    category: "legs",
  },
  {
    label: "Goblet Squat",
    value: "Goblet Squat",
    category: "legs",
  },
  {
    label: "Hack Squat Machine",
    value: "Hack Squat Machine",
    category: "legs",
  },
  {
    label: "Half Air Squat",
    value: "Half Air Squat",
    category: "legs",
  },
  {
    label: "Hip Adduction Machine",
    value: "Hip Adduction Machine",
    category: "legs",
  },
  {
    label: "Landmine Hack Squat",
    value: "Landmine Hack Squat",
    category: "legs",
  },
  {
    label: "Landmine Squat",
    value: "Landmine Squat",
    category: "legs",
  },
  {
    label: "Leg Extension",
    value: "Leg Extension",
    category: "legs",
  },
  {
    label: "Leg Press",
    value: "Leg Press",
    category: "legs",
  },
  {
    label: "Lying Leg Curl",
    value: "Lying Leg Curl",
    category: "legs",
  },
  {
    label: "Pause Squat",
    value: "Pause Squat",
    category: "legs",
  },
  {
    label: "Romanian Deadlift",
    value: "Romanian Deadlift",
    category: "legs",
  },
  {
    label: "Safety Bar Squat",
    value: "Safety Bar Squat",
    category: "legs",
  },
  {
    label: "Seated Leg Curl",
    value: "Seated Leg Curl",
    category: "legs",
  },
  {
    label: "Shallow Body Weight Lunge",
    value: "Shallow Body Weight Lunge",
    category: "legs",
  },
  {
    label: "Side Lunges (Bodyweight)",
    value: "Side Lunges (Bodyweight)",
    category: "legs",
  },
  {
    label: "Smith Machine Squat",
    value: "Smith Machine Squat",
    category: "legs",
  },
  {
    label: "Squat",
    value: "Squat",
    category: "legs",
  },
  {
    label: "Step Up",
    value: "Step Up",
    category: "legs",
  },

  {
    label: "Back Extension",
    value: "Back Extension",
    category: "back",
  },
  {
    label: "Barbell Row",
    value: "Barbell Row",
    category: "back",
  },
  {
    label: "Barbell Shrug",
    value: "Barbell Shrug",
    category: "back",
  },
  {
    label: "Block Snatch",
    value: "Block Snatch",
    category: "back",
  },
  {
    label: "Cable Close Grip Seated Row",
    value: "Cable Close Grip Seated Row",
    category: "back",
  },
  {
    label: "Cable Wide Grip Seated Row",
    value: "Cable Wide Grip Seated Row",
    category: "back",
  },
  {
    label: "Chin-Up",
    value: "Chin-Up",
    category: "back",
  },
  {
    label: "Clean",
    value: "Clean",
    category: "back",
  },
  {
    label: "Clean and Jerk",
    value: "Clean and Jerk",
    category: "back",
  },
  {
    label: "Deadlift",
    value: "Deadlift",
    category: "back",
  },
  {
    label: "Deficit Deadlift",
    value: "Deficit Deadlift",
    category: "back",
  },
  {
    label: "Dumbbell Deadlift",
    value: "Dumbbell Deadlift",
    category: "back",
  },
  {
    label: "Dumbbell Row",
    value: "Dumbbell Row",
    category: "back",
  },
  {
    label: "Dumbbell Shrug",
    value: "Dumbbell Shrug",
    category: "back",
  },
  {
    label: "Floor Back Extension",
    value: "Floor Back Extension",
    category: "back",
  },
  {
    label: "Good Morning",
    value: "Good Morning",
    category: "back",
  },
  {
    label: "Hang Clean",
    value: "Hang Clean",
    category: "back",
  },
  {
    label: "Hang Power Clean",
    value: "Hang Power Clean",
    category: "back",
  },
  {
    label: "Hang Power Snatch",
    value: "Hang Power Snatch",
    category: "back",
  },
  {
    label: "Hang Snatch",
    value: "Hang Snatch",
    category: "back",
  },
  {
    label: "Inverted Row",
    value: "Inverted Row",
    category: "back",
  },
  {
    label: "Inverted Row with Underhand Grip",
    value: "Inverted Row with Underhand Grip",
    category: "back",
  },
  {
    label: "Kettlebell Swing",
    value: "Kettlebell Swing",
    category: "back",
  },
  {
    label: "Lat Pulldown With Pronated Grip",
    value: "Lat Pulldown With Pronated Grip",
    category: "back",
  },
  {
    label: "Lat Pulldown With Supinated Grip",
    value: "Lat Pulldown With Supinated Grip",
    category: "back",
  },
  {
    label: "One-Handed Cable Row",
    value: "One-Handed Cable Row",
    category: "back",
  },
  {
    label: "One-Handed Lat Pulldown",
    value: "One-Handed Lat Pulldown",
    category: "back",
  },
  {
    label: "Pause Deadlift",
    value: "Pause Deadlift",
    category: "back",
  },
  {
    label: "Pendlay Row",
    value: "Pendlay Row",
    category: "back",
  },
  {
    label: "Power Clean",
    value: "Power Clean",
    category: "back",
  },
  {
    label: "Power Snatch",
    value: "Power Snatch",
    category: "back",
  },
  {
    label: "Pull-Up",
    value: "Pull-Up",
    category: "back",
  },
  {
    label: "Rack Pull",
    value: "Rack Pull",
    category: "back",
  },
  {
    label: "Seal Row",
    value: "Seal Row",
    category: "back",
  },
  {
    label: "Seated Machine Row",
    value: "Seated Machine Row",
    category: "back",
  },
  {
    label: "Snatch",
    value: "Snatch",
    category: "back",
  },
  {
    label: "Snatch Grip Deadlift",
    value: "Snatch Grip Deadlift",
    category: "back",
  },
  {
    label: "Stiff-Legged Deadlift",
    value: "Stiff-Legged Deadlift",
    category: "back",
  },
  {
    label: "Straight Arm Lat Pulldown",
    value: "Straight Arm Lat Pulldown",
    category: "back",
  },
  {
    label: "Sumo Deadlift",
    value: "Sumo Deadlift",
    category: "back",
  },
  {
    label: "T-Bar Row",
    value: "T-Bar Row",
    category: "back",
  },
  {
    label: "Trap Bar Deadlift With High Handles",
    value: "Trap Bar Deadlift With High Handles",
    category: "back",
  },
  {
    label: "Trap Bar Deadlift With Low Handles",
    value: "Trap Bar Deadlift With Low Handles",
    category: "back",
  },

  {
    label: "Banded Side Kicks",
    value: "Banded Side Kicks",
    category: "glute",
  },
  {
    label: "Cable Pull Through",
    value: "Cable Pull Through",
    category: "glute",
  },
  {
    label: "Clamshells",
    value: "Clamshells",
    category: "glute",
  },
  {
    label: "Dumbbell Romanian Deadlift",
    value: "Dumbbell Romanian Deadlift",
    category: "glute",
  },
  {
    label: "Dumbbell Frog Pumps",
    value: "Dumbbell Frog Pumps",
    category: "glute",
  },
  {
    label: "Fire Hydrants",
    value: "Fire Hydrants",
    category: "glute",
  },
  {
    label: "Frog Pumps",
    value: "Frog Pumps",
    category: "glute",
  },
  {
    label: "Glute Bridge",
    value: "Glute Bridge",
    category: "glute",
  },
  {
    label: "Hip Abduction Against Band",
    value: "Hip Abduction Against Band",
    category: "glute",
  },
  {
    label: "Hip Abduction Machine",
    value: "Hip Abduction Machine",
    category: "glute",
  },
  {
    label: "Hip Thrust",
    value: "Hip Thrust",
    category: "glute",
  },
  {
    label: "Hip Thrust Machine",
    value: "Hip Thrust Machine",
    category: "glute",
  },
  {
    label: "Hip Thrust With Band Around Knees",
    value: "Hip Thrust With Band Around Knees",
    category: "glute",
  },
  {
    label: "Lateral Walk With Band",
    value: "Lateral Walk With Band",
    category: "glute",
  },
  {
    label: "Machine Glute Kickbacks",
    value: "Machine Glute Kickbacks",
    category: "glute",
  },
  {
    label: "One-Legged Glute Bridge",
    value: "One-Legged Glute Bridge",
    category: "glute",
  },
  {
    label: "One-Legged Hip Thrust",
    value: "One-Legged Hip Thrust",
    category: "glute",
  },
  {
    label: "Romanian Deadlift",
    value: "Romanian Deadlift",
    category: "glute",
  },
  {
    label: "Single Leg Romanian Deadlift",
    value: "Single Leg Romanian Deadlift",
    category: "glute",
  },
  {
    label: "Standing Glute Kickback in Machine",
    value: "Standing Glute Kickback in Machine",
    category: "glute",
  },
  {
    label: "Step Up",
    value: "Step Up",
    category: "glute",
  },

  {
    label: "Eccentric Heel Drop",
    value: "Eccentric Heel Drop",
    category: "calves",
  },
  {
    label: "Heel Raise",
    value: "Heel Raise",
    category: "calves",
  },
  {
    label: "Seated Calf Raise",
    value: "Seated Calf Raise",
    category: "calves",
  },
  {
    label: "Standing Calf Raise",
    value: "Standing Calf Raise",
    category: "calves",
  },

  {
    label: "Barbell Wrist Curl",
    value: "Barbell Wrist Curl",
    category: "forearm",
  },
  {
    label: "Barbell Wrist Curl Behind the Back",
    value: "Barbell Wrist Curl Behind the Back",
    category: "forearm",
  },
  {
    label: "Bar Hang",
    value: "Bar Hang",
    category: "forearm",
  },
  {
    label: "Dumbbell Wrist Curl",
    value: "Dumbbell Wrist Curl",
    category: "forearm",
  },
  {
    label: "Farmers Walk",
    value: "Farmers Walk",
    category: "forearm",
  },
  {
    label: "Fat Bar Deadlift",
    value: "Fat Bar Deadlift",
    category: "forearm",
  },
  {
    label: "Gripper",
    value: "Gripper",
    category: "forearm",
  },
  {
    label: "One-Handed Bar Hang",
    value: "One-Handed Bar Hang",
    category: "forearm",
  },
  {
    label: "Plate Pinch",
    value: "Plate Pinch",
    category: "forearm",
  },
  {
    label: "Plate Wrist Curl",
    value: "Plate Wrist Curl",
    category: "forearm",
  },
  {
    label: "Towel Pull-Up",
    value: "Towel Pull-Up",
    category: "forearm",
  },
  {
    label: "Barbell Wrist Extension",
    value: "Barbell Wrist Extension",
    category: "forearm",
  },
  {
    label: "Dumbbell Wrist Extension",
    value: "Dumbbell Wrist Extension",
    category: "forearm",
  },
];

const exercisesArr = [
  "Bench Press (Barbell)",
  "Bench Press Close Grip (Barbell)",
  "Bench Press (Dumbbell)",
  "Bench Press Inclined (Dumbbell)",
  "Bench Press Inclined (Barbell)",
  "Bench Press Decline (Dumbbell)",
  "Bench Press Decline (Barbell)",
  "Chest Fly Inclined (Dumbbell)",
  "Chest Fly Inclined (Machine)",
  "Chest Fly (Dumbbell)",
  "Chest Fly (Machine)",
  "Chest Fly Top (Machine)",
  "Chest Fly Bottom (Machine)",
  "Cable Chest Press",
  "Dumbbell Pullover",
  "Bicep Curl Standing (Barbell)",
  "Bicep Curl Standing (Dumbbell)",
  "Bicep Curl Sitting (Dumbbell)",
  "Bicep Curl Inclined (Dumbbell)",
  "Squat",
  "Seated Cable Row",
  "Shoulders Press (Dumbbell)",
  "Military Press",
  "Deadlift (Barbell)",
  "Deadlift (Trap Bar)",
  "Deadlift Sumo",
  "Leg Press",
  "Lat Pulldown (Cable)",
  "Lat Pulldown Open Grip (Machine)",
  "Lat Pulldown Reverse Grip (Machine)",
  "Lat Pulldown Close Grip (Machine)",
  "Incline Row (Dumbbell)",
  "Lateral Raise (Machine)",
  "Lateral Raise (Dumbbell)",
  "Lunge (Dumbbell)",
  "Triceps Pushdown (Cable - straight bar)",
  "Triceps Pushdown (Cable - curve bar)",
  "Triceps Pushdown (Cable - ropes bar)",
  "Triceps Extension (Cable - straight bar)",
  "Triceps Extension (Cable - curve bar)",
  "Triceps Extension (Cable - ropes bar)",
  "Triceps Dip",
  "Triceps French Press",
  "Preacher Curl (Machine)",
  "Preacher Curl (Dumbbell)",
  "Preacher Curl (Barbell)",
  "Pull Ups",
  "Pull Ups Revert",
  "Seated Calf Raise (machine)",
  "Elevated Calf Raises",
];

const WorkoutProvider = (props) => {
  // const [exercises, setExercises] = useState(exercisesArr.sort());
  const [exercises, setExercises] = useState(newExercisesArray);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isEmptySet, setIsEmptySet] = useState(false);
  const [isEmptySetModalOpen, setIsEmptySetModalOpen] = useState(false);
  const [isFinishWorkoutPopupOpen, setIsFinishWorkoutPopupOpen] =
    useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isCancelWorkoutPopupOpen, setIsCancelWorkoutPopupOpen] =
    useState(false);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isSavedTemplatesOpen, setIsSavedTemplatesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startWorkoutTimestamp, setStartWorkoutTimestamp] = useState(0);
  const [bestResult, setBestResult] = useState(0);
  const [workoutTimeMs, setWorkoutTimeMs] = useState(0);
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [exerciseSets, setExerciseSets] = useState([]);
  const [filteredExercise, setFilteredExercise] = useState([]);
  const [workoutsHistory, setWorkoutHistory] = useState([]);
  const [logger, setLogger] = useState();

  const addExercise = (exercise) => {
    const preworkout = getPreWorkoutFromLocal();
    const exerciseObj = {
      name: exercise,
      isDone: false,
      sets: [{ id: 0, kg: "", reps: "" }],
    };

    preworkout
      ? setFilteredExercise([...preworkout, exerciseObj])
      : setFilteredExercise([...filteredExercise, exerciseObj]);
  };

  const removeExercise = (exercise) => {
    const result = filteredExercise.filter((item) => item.name !== exercise);

    setFilteredExercise(result);
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

  const setWorkoutObj = (filteredExercise) => {
    const timestamp = Date.now();
    const startTimestamp = getTimestampToLocalStorage();
    const workoutTimeMs = timestamp - startTimestamp;
    const today = new Date(timestamp).toLocaleDateString();

    setWorkoutTimeMs(workoutTimeMs);

    return {
      timestamp,
      date: today,
      timeSpent: workoutTimeMs,
      finishedExercises: filteredExercise,
    };
  };

  const checkIfEmptySet = (setsArr) => {
    setsArr &&
      setsArr.map((set) => {
        if (set.kg.length === 0 || set.reps.length === 0) {
          setIsEmptySet(true);
        } else {
          setIsEmptySet(false);
        }
      });
  };

  const setWorkoutFromTemplate = (exercises) => {
    const result = exercises.map((exercise) => ({
      name: exercise,
      sets: [{ id: 0, kg: "", reps: "" }],
    }));

    setFilteredExercise(result);
    setIsWorkoutStarted(true);
    setIsSavedTemplatesOpen(false);
  };

  const finishWorkout = async () => {
    const finishedWorkoutWithoutIsDone = filteredExercise.map(
      ({ isDone, ...rest }) => rest
    );
    const finishedWorkout = setWorkoutObj(finishedWorkoutWithoutIsDone);
    const userInfo = getUserInfoFromLocalStorage();
    const token = getTokenFromLocalStorage();
    const { name, email, workoutsArr, workoutTemplates, bestResults } =
      userInfo;
    const existingStorage = {
      name,
      email,
      workoutsArr,
      workoutTemplates,
      bestResults,
    };
    const options = {
      method: "POST",
      body: JSON.stringify({
        finishedWorkout,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    setIsLoading(true);

    try {
      const data = await fetch("/workout/addWorkout", options);
      console.log(data);

      if (data.status === 200) {
        existingStorage.workoutsArr.push(finishedWorkout);
        setUserInfoToLocalStorage(existingStorage);
        setIsFinishWorkoutPopupOpen(false);
        setIsWorkoutFinished(true);
        setStartWorkoutTimestamp(0);
        setPreWorkoutsArrayToLocal(false);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e, "error from post addWorkout");
      setIsLoading(false);
    }
  };

  const cancelWorkout = () => {
    setIsCancelWorkoutPopupOpen(false);
    setFilteredExercise([]);
    setStartWorkoutTimestamp(0);
    setIsWorkoutStarted(false);
    setPreWorkoutsArrayToLocal(false);
    resetTimestampToLocalStorage();
  };

  const handleClickDialog = (exercise) => {
    const updatedFilteredExercises = filteredExercise.filter(
      (item) => item.name !== exercise
    );
    setFilteredExercise(updatedFilteredExercises);
  };

  useEffect(() => {
    const test = getPreWorkoutFromLocal();

    if (test?.length > 0) {
      setFilteredExercise(test);
    }
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        startWorkoutTimestamp,
        workoutTimeMs,
        exercises,
        workoutsHistory,
        setWorkoutHistory,
        filteredExercise,
        isEmptySet,
        isWorkoutModalOpen,
        isEmptySetModalOpen,
        isFinishWorkoutPopupOpen,
        isLoading,
        setIsLoading: setIsLoading,
        isWorkoutFinished,
        isCancelWorkoutPopupOpen,
        allExercises,
        setAllExercises: setAllExercises,
        workoutsFromDb,
        exerciseSets,
        bestResult,
        isWorkoutStarted,
        isSavedTemplatesOpen,
        setIsSavedTemplatesOpen: setIsSavedTemplatesOpen,
        setExerciseSets: setExerciseSets,
        setWorkoutsFromDb: setWorkoutsFromDb,
        setIsCancelWorkoutPopupOpen,
        setWorkoutObj: setWorkoutObj,
        setExercises: setExercises,
        setIsWorkoutStarted: setIsWorkoutStarted,
        setStartWorkoutTimestamp: setStartWorkoutTimestamp,
        setIsWorkoutModalOpen: setIsWorkoutModalOpen,
        addExercise: addExercise,
        removeExercise: removeExercise,
        cancelWorkout: cancelWorkout,
        updateExercise: updateExercise,
        handleClickDialog: handleClickDialog,
        finishWorkout: finishWorkout,
        checkIfEmptySet: checkIfEmptySet,
        setIsEmptySet: setIsEmptySet,
        setIsEmptySetModalOpen: setIsEmptySetModalOpen,
        setIsFinishWorkoutPopupOpen: setIsFinishWorkoutPopupOpen,
        setIsWorkoutFinished: setIsWorkoutFinished,
        setFilteredExercise: setFilteredExercise,
        setWorkoutFromTemplate: setWorkoutFromTemplate,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;

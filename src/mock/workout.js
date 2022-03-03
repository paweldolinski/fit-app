const testArr = [
  {
    timestamp: 1645440406234,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "100",
        reps: "10",
      },
      {
        id: 1,
        kg: "100",
        reps: "10",
      },
      {
        id: 2,
        kg: "100",
        reps: "8",
      },
      {
        id: 3,
        kg: "90",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440473369,
    name: "Bicep Curl",
    sets: [
      {
        id: 0,
        kg: "30",
        reps: "8",
      },
      {
        id: 1,
        kg: "30",
        reps: "8",
      },
      {
        id: 2,
        kg: "30",
        reps: "7",
      },
      {
        id: 3,
        kg: "30",
        reps: "7",
      },
    ],
  },
  {
    timestamp: 16454404733100,
    name: "Deadlift",
    sets: [
      {
        id: 0,
        kg: "140",
        reps: "10",
      },
      {
        id: 1,
        kg: "140",
        reps: "10",
      },
      {
        id: 2,
        kg: "140",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492843,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "10",
        reps: "10",
      },
      {
        id: 1,
        kg: "10",
        reps: "10",
      },
      {
        id: 2,
        kg: "10",
        reps: "8",
      },
      {
        id: 3,
        kg: "9",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492068,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "50",
        reps: "10",
      },
      {
        id: 1,
        kg: "50",
        reps: "10",
      },
      {
        id: 2,
        kg: "50",
        reps: "8",
      },
      {
        id: 3,
        kg: "50",
        reps: "8",
      },
    ],
  },
];

const arrFromStorage = [
  {
    timestamp: 1645441622264,
    name: "Lat Pulldown",
    sets: [
      {
        id: 0,
        kg: "12",
        reps: "12",
      },
    ],
  },
  {
    timestamp: 1645440406234,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "100",
        reps: "10",
      },
      {
        id: 1,
        kg: "100",
        reps: "10",
      },
      {
        id: 2,
        kg: "100",
        reps: "8",
      },
      {
        id: 3,
        kg: "90",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440473369,
    name: "Bicep Curl",
    sets: [
      {
        id: 0,
        kg: "30",
        reps: "8",
      },
      {
        id: 1,
        kg: "30",
        reps: "8",
      },
      {
        id: 2,
        kg: "30",
        reps: "7",
      },
      {
        id: 3,
        kg: "30",
        reps: "7",
      },
    ],
  },
  {
    timestamp: 16454404733100,
    name: "Deadlift",
    sets: [
      {
        id: 0,
        kg: "140",
        reps: "10",
      },
      {
        id: 1,
        kg: "140",
        reps: "10",
      },
      {
        id: 2,
        kg: "140",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492843,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "10",
        reps: "10",
      },
      {
        id: 1,
        kg: "10",
        reps: "10",
      },
      {
        id: 2,
        kg: "10",
        reps: "8",
      },
      {
        id: 3,
        kg: "9",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492068,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "50",
        reps: "10",
      },
      {
        id: 1,
        kg: "50",
        reps: "10",
      },
      {
        id: 2,
        kg: "50",
        reps: "8",
      },
      {
        id: 3,
        kg: "50",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440406234,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "100",
        reps: "10",
      },
      {
        id: 1,
        kg: "100",
        reps: "10",
      },
      {
        id: 2,
        kg: "100",
        reps: "8",
      },
      {
        id: 3,
        kg: "90",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440473369,
    name: "Bicep Curl",
    sets: [
      {
        id: 0,
        kg: "30",
        reps: "8",
      },
      {
        id: 1,
        kg: "30",
        reps: "8",
      },
      {
        id: 2,
        kg: "30",
        reps: "7",
      },
      {
        id: 3,
        kg: "30",
        reps: "7",
      },
    ],
  },
  {
    timestamp: 16454404733100,
    name: "Deadlift",
    sets: [
      {
        id: 0,
        kg: "140",
        reps: "10",
      },
      {
        id: 1,
        kg: "140",
        reps: "10",
      },
      {
        id: 2,
        kg: "140",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492843,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "10",
        reps: "10",
      },
      {
        id: 1,
        kg: "10",
        reps: "10",
      },
      {
        id: 2,
        kg: "10",
        reps: "8",
      },
      {
        id: 3,
        kg: "9",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645440492068,
    name: "Bench press",
    sets: [
      {
        id: 0,
        kg: "50",
        reps: "10",
      },
      {
        id: 1,
        kg: "50",
        reps: "10",
      },
      {
        id: 2,
        kg: "50",
        reps: "8",
      },
      {
        id: 3,
        kg: "50",
        reps: "8",
      },
    ],
  },
  {
    timestamp: 1645442082168,
    name: "Bench press dumbbell",
    sets: [
      {
        id: 0,
        kg: "10",
        reps: "11",
      },
      {
        id: 1,
        kg: "20",
        reps: "11",
      },
      {
        id: 2,
        kg: "30",
        reps: "11",
      },
    ],
  },
  {
    timestamp: 1645442084574,
    name: "Bicep Curl dumbbell",
    sets: [
      {
        id: 0,
        kg: "20",
        reps: "11",
      },
      {
        id: 1,
        kg: "11",
        reps: "20",
      },
      {
        id: 2,
        kg: "15",
        reps: "11",
      },
    ],
  },
];

export default testArr;

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const data = [
  { name: "day1", uv: 401, pv: 402, amt: 2400 },
  { name: "day2", uv: 200, pv: 2000, amt: 2000 },
  { name: "day3", uv: 200, pv: 2000, amt: 2000 },
];
export const Chart = ({ sets }) => {
  // const [data, setData] = useState([]);
  const [allReps, setAllReps] = useState([]);

  const t2 = () => {
    const res = {};

    sets.forEach((item) => {
      const { date, kg, reps } = item;
      if (res[date]) {
        res[date].push({ kg, reps });
      } else {
        res[date] = [{ kg, reps }];
      }
    });

    const t = [];

    for (const property in res) {
      t.push({ date: property, sets: res[property] });
    }

    console.log(t, "t");

    const test = t.map(({ sets }) => sets.map(({ reps }) => reps));

    console.log(test, "test");

    // setData(t);
  };

  return (
    <LineChart width={300} height={300} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );
};

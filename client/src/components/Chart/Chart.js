import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import Button from "../Buttons/Button";
import * as React from "react";

export const Chart = ({ sets }) => {
  return (
    <ResponsiveContainer width="100%" height="60%">
      <LineChart
        width={500}
        height={300}
        data={sets}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickCount={55} minTickGap={1} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="kg" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

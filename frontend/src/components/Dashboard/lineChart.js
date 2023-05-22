import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", quantidade: 10 },
  { name: "Feb", quantidade: 20 },
  { name: "Mar", quantidade: 15 },
];

const LineChartDashboard = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="quantidade"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default LineChartDashboard;

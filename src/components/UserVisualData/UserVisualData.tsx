import React from "react";
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

export default function UserVisualData() {
  let data = [
    {
      name: "Attention",
      Test1: 50,
      Test2: 65,
      amt: 100,
    },
    {
      name: "Memory",
      Test1: 60,
      Test2: 75,
      amt: 100,
    },
    {
      name: "ResponseTime",
      Test1: 70,
      Test2: 85,
      amt: 100,
    },
    {
      name: "Flexability",
      Test1: 80,
      Test2: 90,
      amt: 100,
    },
    {
      name: "Creativity",
      Test1: 85,
      Test2: 90,
      amt: 100,
    },

  ];

  return (
    <ResponsiveContainer width="100%" aspect={2} height="100vh">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 10,
        }}

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis fontSize={10} dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Test1"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Test2" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

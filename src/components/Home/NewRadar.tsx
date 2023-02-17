import axios from "axios";
import { useEffect, useState } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { TypoYoad } from "../../TypoYoad";
import domain from "../../util/domain";

export default function NewRadar({}: any) {
  const [memory, setMemory] = useState<number[]>([]);
  const [response, setResponse] = useState<number[]>([]);

  useEffect(() => {
    const getMemory = async () => {
      try {
        const scores = await axios.get(domain + "memory/getScores");
        const toProc = Array.from(
          new Set(scores.data.map((r: any) => r.result))
        );
        setMemory((toProc as number[]).filter((num: number) => num !== 0));
      } catch (e) {}
    };
    getMemory();
    const getResponse = async () => {
      try {
        const scores = await axios.get(domain + "response/getScores");
        const toProc = Array.from(
          new Set(scores.data.map((r: any) => r.result))
        );
        setResponse((toProc as number[]).filter((num: number) => num !== 0));
      } catch (e) {}
    };
    getResponse();
  }, []);

  const numberOfTests = Math.min(
    memory ? memory.length || 0 : 0,
    response ? response.length || 0 : 0
  );

  if (numberOfTests) {
    let data: any = [
      {
        subject: "Attention",
      },
      {
        subject: "Memory",
      },
      {
        subject: "Response Time",
      },
    ];

    for (let i = 0; i < numberOfTests; i++) {
      data[1][("Test" + i) as keyof any] = memory[i];
      data[0][("Test" + i) as keyof any] = response[i];
      data[2][("Test" + i) as keyof any] = response[i];
    }

    console.log(data);

    let renderer = [];
    for (let i = 0; i < numberOfTests; i++) {
      renderer.push(Math.random());
    }

    const gptColors = [
      "#FFFFFF", // white
      "#F44336", // red
      "#E91E63", // pink
      "#9C27B0", // purple
      "#673AB7", // deep purple
      "#3F51B5", // indigo
      "#2196F3", // blue
      "#03A9F4", // light blue
      "#00BCD4", // cyan
      "#009688", // teal
      "#4CAF50", // green
      "#8BC34A", // light green
      "#CDDC39", // lime
      "#FFEB3B", // yellow
      "#FFC107", // amber
      "#FF9800", // orange
      "#FF5722", // deep orange
      "#795548", // brown
      "#9E9E9E", // grey
      "#607D8B", // blue grey
    ];

    return (
      <ResponsiveContainer width="100%" aspect={1} height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis fontSize={10} dataKey="subject" />
          <PolarRadiusAxis fontSize={10} angle={90} domain={[0, 100]} />
          {renderer.map((randomnum, i) => (
            <Radar
              name={"Test " + (i + 1)}
              dataKey={"Test" + i}
              stroke={gptColors[i]}
              fill={gptColors[i]}
              fillOpacity={0.2}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  } else return <TypoYoad>Loading... or maybe you didnt do any test</TypoYoad>;
}

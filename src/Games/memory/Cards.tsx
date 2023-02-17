import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TypoYoad } from "../../TypoYoad";
import NeurobicaColors from "../../util/NeurobicaColors";
import { Hit } from "./Manager";
import NeurobiCard from "./NeurobiCard";
import { visibilityTimeInMillis } from "./settings";
import Timer from "./Timer";
export const GOLD = "#F9A645";

export type gameColor = "black" | typeof GOLD | "red";

export default function Cards({
  n,
  hits,
  setHits,
  score,
  setTimer,
  timer,
}: any) {
  const [random, _] = useState(getRandomNumbers(n));

  const randomColors: gameColor[][] = [];

  const colorstemp: gameColor[][] = [];
  for (let i = 0; i < n; i++) {
    colorstemp.push([]);
    randomColors.push([]);
    for (let j = 0; j < n; j++) {
      if (random.filter((xx) => xx === i * n + j).length > 0) {
        colorstemp[i].push(GOLD);
        randomColors[i].push(GOLD);
      } else {
        colorstemp[i].push("black");
        randomColors[i].push("black");
      }
    }
  }

  const [colors, setColors] = useState<gameColor[][]>(colorstemp);

  useEffect(() => {
    setTimeout(() => setColors(blacknxn(n)), visibilityTimeInMillis);
  }, []);

  return colors ? (
    <div>
      {generateCardGrid(
        n,
        colors,
        setColors,
        randomColors,
        hits,
        setHits,
        score,
        timer
      )}
    </div>
  ) : (
    <div>loading...</div>
  );
}

function generateCardGrid(
  n: number,
  colors: gameColor[][],
  setColors: Dispatch<SetStateAction<gameColor[][]>>,
  random: gameColor[][],
  hits: Hit[],
  setHits: Dispatch<SetStateAction<Hit[]>>,
  score: number,
  timer: number
) {
  return (
    colors &&
    colors.length &&
    colors.length > 0 &&
    colors[0].length &&
    colors[0].length > 0 && (
      <Box bgcolor={NeurobicaColors.yea}>
        <Box
          position="fixed"
          top={0}
          width="100vw"
          height="5vh"
          sx={{ textAlign: "center" }}
        >
          {" "}
          <TypoYoad variant="h2">{score}</TypoYoad>
          <TypoYoad variant="h5">{"level: " + (n - 1)}</TypoYoad>
          <Timer otime={timer} />
        </Box>

        <Grid
          container
          width="100vw"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item container spacing={n > 10 ? 1 : 2}>
            {[...Array(n)].map((_, i) => (
              <Grid wrap="nowrap" key={i} item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  spacing={n > 10 ? 1 : 2}
                >
                  {[...Array(n)].map((_, j) => (
                    <Grid wrap="nowrap" key={j} item>
                      <NeurobiCard
                        n={n}
                        i={i}
                        j={j}
                        colors={colors}
                        random={random}
                        colorin={colors[i] ? colors[i][j] : "black"}
                        hits={hits}
                        setHits={setHits}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    )
  );
}

function getRandomNumbers(n: any) {
  const numbers = [];
  for (let i = 0; i < n * n; i++) {
    numbers.push(i);
  }

  const result = [];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    result.push(numbers.splice(index, 1)[0]);
  }

  return result;
}
function blacknxn(n: any) {
  const colorstemp: gameColor[][] = [];
  for (let i = 0; i < n; i++) {
    colorstemp.push([]);
    for (let j = 0; j < n; j++) {
      colorstemp[i].push("black");
    }
  }
  return colorstemp;
}

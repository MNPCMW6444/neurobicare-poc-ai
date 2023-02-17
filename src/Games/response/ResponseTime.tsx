import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ResponseHall from "./ResponseHall";

import mascot from "../../assets/MascotWeights.png";
import NeurobicaColors from "../../util/NeurobicaColors";
import { TypoYoad } from "../../TypoYoad";

export const avg = (arr: number[]) => {
  let avg = 0;
  for (let i = 0; i < arr.length; i++) {
    avg = +arr[i];
  }
  return avg;
};

export default function ResponseTime({
  rounds,
  setRounds,
  scores,
  setScores,
}: any) {
  const [time1, setTime1] = useState(0);
  const [time2, setTime2] = useState(0);

  const [gamefinished, setGamefinished] = useState(false);

  useEffect(() => {
    if (!gamefinished && time2 !== 0) {
      setGamefinished(false);
    }
    if (gamefinished) {
      setGamefinished(false);
      setTime1(0);
      setTime2(0);
      rounds < 5 && setRounds(rounds + 1);
      setScores([
        ...scores,
        (time2 - time1) / 1000 < 0
          ? 0
          : 100 * 10 ** (0 - (time2 - time1) / 1000),
      ]);
    }
  }, [gamefinished]);

  !gamefinished && time2 !== 0 && setGamefinished(true);

  const radomDelay = Math.random() * 10 + 5;

  useEffect(() => {
    if (!gamefinished)
      setTimeout(() => {
        setTime1(new Date().getTime());
      }, radomDelay * 1000);
  }, [gamefinished]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      bgcolor={NeurobicaColors.yea}
      onClick={() => time2 === 0 && setTime2(new Date().getTime())}
    >
      <Box
        position="fixed"
        top={0}
        width="100vw"
        height="5vh"
        sx={{ textAlign: "center" }}
      >
        <TypoYoad variant="h4">
          {"Score: " + Math.floor(avg(scores) * 100)}
        </TypoYoad>
        <TypoYoad variant="h4">{"Round: " + rounds + " / 4"}</TypoYoad>
      </Box>
      <>
        {time1 === 0 && (
          <Box
            style={{
              backgroundColor: NeurobicaColors.Main,
              borderRadius: "20%",
              height: "40vh",
              width: "40vw",
              padding: "5%",
              display: "flex",
              justifyContent: "ceter",
              alignItems: "center",
            }}
            position="fixed"
          >
            <Typography
              variant="h4"
              textAlign="center"
              sx={{ fontWeight: 900 }}
            >
              Tap on Brianny as Soon as at it Appears!
            </Typography>
          </Box>
        )}
        <Box
          component="img"
          src={mascot}
          style={{
            backgroundColor: NeurobicaColors.Main,
            borderRadius: "20%",
            height: "40vh",
            width: "40vw",
            padding: "5%",
            opacity: time1 === 0 ? 0 : 1,
          }}
          position="fixed"
        ></Box>
      </>
    </Box>
  );
}

import Box from "@mui/material/Box";
import NeurobicaColors from "../../util/NeurobicaColors";
import { YoadButn } from "../../YoadButn";

export default function Hall({
  setFightsnOn,
  setLevel,
  setTimer,
  setHits,
  setScore,
  setPartyMode,
  setTrigerNext,
}: any) {
  setTimeout(() => setTrigerNext(true), 1);
  return (
    <Box bgcolor={NeurobicaColors.yea}>
      <YoadButn
        variant="outlined"
        onClick={() => {
          setFightsnOn(true);

          setLevel(2);

          setTimer(new Date().getTime());

          setHits([]);

          setScore(0);

          setPartyMode(false);
        }}
      >
        Play again?
      </YoadButn>
    </Box>
  );
}

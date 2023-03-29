import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Read from "./Read";
import Manager from "./response/Manager";
import NeurobicareColors from "./util/NeurobicareColors";

export default function Ai({ currentEEG, uname, v }: any) {
  const [state, setState] = useState("none");

  return state === "none" ? (
    <Grid container direction="column" rowSpacing={4}>
      <Grid item>
        <Button
          sx={{
            color: NeurobicareColors.p3,
            fontSize: "200%",
            backgroundColor: NeurobicareColors.p0,
            borderRadius: "35px",
          }}
          variant="contained"
          onClick={() => setState("train")}
        >
          Train
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{
            color: NeurobicareColors.p3,
            fontSize: "200%",
            backgroundColor: NeurobicareColors.p0,
            borderRadius: "35px",
          }}
          variant="contained"
          onClick={() => setState("read")}
        >
          test
        </Button>
      </Grid>
    </Grid>
  ) : state === "train" ? (
    <Manager currentEEG={currentEEG} uname={uname} v={v} />
  ) : state === "read" ? (
    <Read currentEEG={currentEEG} uname={uname} />
  ) : null;
}

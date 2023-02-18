import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Read from "./Read";
import Manager from "./response/Manager";

export default function Ai({ currentEEG }: any) {
  const [state, setState] = useState("none");

  return state === "none" ? (
    <Grid container direction="column" rowSpacing={4}>
      <Grid item>
        <Button sx={{ fottSize: "300%" }} onClick={() => setState("train")}>
          Train
        </Button>
      </Grid>
      <Grid item>
        <Button sx={{ fottSize: "300%" }} onClick={() => setState("read")}>
          Read
        </Button>
      </Grid>
    </Grid>
  ) : state === "train" ? (
    <Manager currentEEG={currentEEG} />
  ) : state === "read" ? (
    <Read />
  ) : null;
}

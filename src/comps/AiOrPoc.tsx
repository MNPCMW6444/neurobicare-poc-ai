import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Ai from "./Ai";
import POCM from "./POCM";

export default function AiOrPoc({ final }: any) {
  const [state, setState] = useState("none");

  return state === "none" ? (
    <Grid container direction="column" rowSpacing={4}>
      <Grid item>
        <Button sx={{ fottSize: "300%" }} onClick={() => setState("ai")}>
          ai
        </Button>
      </Grid>
      <Grid item>
        <Button sx={{ fottSize: "300%" }} onClick={() => setState("poc")}>
          poc
        </Button>
      </Grid>
    </Grid>
  ) : state === "ai" ? (
    <Ai currentEEG={final} />
  ) : state === "poc" ? (
    <POCM final={final} />
  ) : null;
}

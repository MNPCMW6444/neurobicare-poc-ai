import Grid from "@mui/material/Grid";
import React from "react";
import Ai from "./Ai";
import Clock from "./Clock";
import EEGVisuManager from "./EEGVisuManager";
import POC from "./POC";
import ToServer from "./ToServer";

export default function POCM({ final }: any) {
  return (
    <>
      <Grid item>
        <Clock timestamp={((final as any)?.original as any)?.timestamp || 0} />
      </Grid>
      <Grid item>
        <ToServer currentEEG={(final as any)?.original as any} />
      </Grid>
      <Grid item>
        <POC currentEEG={(final as any)?.proccesed} />
      </Grid>
      <Grid item>
        <EEGVisuManager currentEEG={(final as any)?.proccesed} />
      </Grid>
      <Grid item>
        <Ai currentEEG={final as any} />{" "}
      </Grid>
    </>
  );
}

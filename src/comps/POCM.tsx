import Grid from "@mui/material/Grid";
import Clock from "./Clock";
import EEGVisuManager from "./EEGVisuManager";
import POC from "./POC";

export default function POCM({ final }: any) {
  return (
    <>
      <Grid item>
        <Clock timestamp={((final as any)?.original as any)?.timestamp || 0} />
      </Grid>
      <Grid item>
        <POC currentEEG={(final as any)?.proccesed} />
      </Grid>
      <Grid item>
        <EEGVisuManager currentEEG={(final as any)?.proccesed} />
      </Grid>
    </>
  );
}

import LoginStatus from "../LoginStatus/LoginStatus";
import "./statusBar.css";
import Grid from "@mui/material/Grid";

export default function StatusBar() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft="1%"
      paddingRight="1%"
    >
      <Grid item></Grid>
      <Grid item>
        <LoginStatus />
      </Grid>
    </Grid>
  );
}

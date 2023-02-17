import Grid from "@mui/material/Grid";

export default function Space({ percent }: any) {
  return <Grid item height={percent + "%"}></Grid>;
}

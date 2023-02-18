import Grid from "@mui/material/Grid";
import { useState } from "react";
import Read from "./Read";
import Manager from "./response/Manager";

export default function Ai({ currentEEG }: any) {
  const [state, setState] = useState("none");

  return state === "none" ? (
    <Grid container direction="column"></Grid>
  ) : state === "train" ? (
    <Manager currentEEG={currentEEG} />
  ) : state === "read" ? (
    <Read />
  ) : null;
}

import Grid from "@mui/material/Grid";
import React from "react";
import { TypoYoad } from "../../TypoYoad";
import NeurobicaColors from "../../util/NeurobicaColors";
import { YoadButn } from "../../YoadButn";

export default function Trans({ foward }: any) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor={NeurobicaColors.yea}
    >
      <Grid item>
        <TypoYoad variant="h1" align="center">
          Well Done!
        </TypoYoad>
        <TypoYoad variant="h4" align="center">
          Get Ready for the second part of the test!
        </TypoYoad>
      </Grid>
      <Grid item paddingBottom="20%">
        <YoadButn
          sx={{
            borderRadius: "30px",
            fontSize: "2rem",
          }}
          variant="contained"
          onClick={() => foward()}
        >
          Im Ready!
        </YoadButn>
      </Grid>
    </Grid>
  );
}

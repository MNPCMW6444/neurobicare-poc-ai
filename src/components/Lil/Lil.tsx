import Grid from "@mui/material/Grid";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import UserVisualDataRadar from "../UserVisualDataRadar/UserVisualDataRadar";

import { useEffect, useState } from "react";
import Axios from "axios";
import domain from "../../util/domain";
import { TypoYoad } from "../../TypoYoad";
import { YoadButn } from "../../YoadButn";

export default function Lil() {
  const [numberOfTimes, setNumberOfTimes] = useState<number>(0);

  useEffect(() => {
    const getFromServer = async () =>
      setNumberOfTimes(
        (await Axios.get(domain + "howmanytimeshehadbeenhere")).data
      );
    getFromServer();
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 0, md: 0, lg: 2 }}
      columns={{ xs: 1, md: 1, lg: 1 }}
      paddingTop="7vh"
      alignItems="center"
      justifyContent="center"
    >
      {numberOfTimes > 1 ? <p>asd</p> : <p>ewrgwef</p>}

      <Grid
        wrap="nowrap"
        item
        m={2}
        paddingLeft="3vh"
        lg={2}
        xs={2}
        sx={{ margin: "0" }}
      >
        <TypoYoad
          sx={{
            color: "#FF8B17",
            textShadow: "1px 1px",
            fontFamily: "arial, Verdana, Sans-serif",
            margin: "0",
          }}
          variant="h5"
          gutterBottom={true}
        >
          Hello, Ready To Train?
        </TypoYoad>
      </Grid>
      <Grid item m={2} xs={2} lg={2} paddingBottom="5vh">
        <YoadButn
          variant="outlined"
          color="inherit"
          sx={{
            color: "#FF8B17",
            width: "100%",
            height: "8vh",
            fontSize: "3vh",
            borderRadius: "30px",
            margin: "0",
          }}
        >
          +
        </YoadButn>
      </Grid>

      <Grid
        wrap="nowrap"
        item
        m={2}
        lg={2}
        xs={2}
        paddingLeft="3vh"
        sx={{ margin: "0" }}
      >
        <TypoYoad
          sx={{
            color: "black",
            fontWeight: "bold",
            fontFamily: "arial, Verdana, Sans-serif",
            margin: "0",
          }}
          variant="h6"
          gutterBottom={true}
        >
          Check Your Gains
          <YoadButn variant="outlined" sx={{ left: "40%" }} aria-label="Gains">
            <ArrowForwardIosIcon />
          </YoadButn>
        </TypoYoad>
      </Grid>

      <Grid item paddingBottom="5vh" sx={{ width: "100%" }}>
        <UserVisualDataRadar />
      </Grid>
      <Grid
        wrap="nowrap"
        item
        m={2}
        paddingLeft="3vh"
        lg={2}
        xs={2}
        sx={{ margin: "0" }}
      >
        <TypoYoad
          sx={{
            color: "black",
            fontWeight: "bold",
            fontFamily: "arial, Verdana, Sans-serif",
            margin: "0",
          }}
          variant="h6"
          gutterBottom={true}
        >
          Test Your Brain
          <YoadButn variant="outlined" aria-label="Gains" sx={{ left: "45%" }}>
            <ArrowForwardIosIcon />
          </YoadButn>
        </TypoYoad>
      </Grid>

      <Grid item m={2} lg={2} xs={2} paddingBottom="10vh">
        <YoadButn
          variant="outlined"
          color="inherit"
          sx={{
            color: "#FF8B17",
            width: "100%",
            height: "5vh",
            fontSize: "2vh",
            borderRadius: "30px",
            margin: "0",
          }}
        >
          Quick Start
        </YoadButn>
      </Grid>
      {/* <Grid wrap="nowrap"item sx={{ width: "100vh" }}>
<UserVisualData />
</Grid> */}
    </Grid>
  );
}

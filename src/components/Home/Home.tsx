import "../../assets/fonts.css";
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import Signout from "../Signout/Signout";
import Grid from "@mui/material/Grid";
import LoginStatus from "../LoginStatus/LoginStatus";
import Manager from "../../Games/memory/Manager";
import ResponseTime from "../../Games/response/Manager";
import NewRadar from "./NewRadar";
import NeurobicaColors from "../../util/NeurobicaColors";
import { YoadButn } from "../../YoadButn";
import Tutorial from "../Tutorial/Tutorial";
import { useNavigate } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar";
import { TypoYoadRoboto } from "../../TypoYoadRoboto";

import img from "./img.png";
import Box from "@mui/material/Box";
import Space from "./Space";

const SendToLogin = () => {
  const nav = useNavigate();

  useEffect(() => {
    const a = setTimeout(() => nav("/my-account"), 1000);
    return () => clearTimeout(a);
  }, []);

  return <>Please login first. In a Second you will be redirected to Login.</>;
};

export default function Home() {
  const { user } = useContext(UserContext);
  const [signout, Signoutf] = useState(false);

  const [memory, setMemory] = useState(false);
  const [response, setResponse] = useState(false);

  let tutorial = !JSON.parse(localStorage.getItem("tutorial") + "");

  const navigate = useNavigate();

  if (tutorial)
    setTimeout(
      () => localStorage.setItem("tutorial", JSON.stringify("done")),
      3000
    );

  const tbutns = () => (
    <>
      <Grid item>
        <YoadButn variant="outlined" onClick={() => {}}>
          Take a Brain Snapshot
        </YoadButn>
      </Grid>
      <Grid item>
        <YoadButn variant="outlined" onClick={() => setMemory(true)}>
          Play Memory Here
        </YoadButn>
      </Grid>
      <Grid item>
        <YoadButn variant="outlined" onClick={() => setResponse(true)}>
          Play Response Here
        </YoadButn>
      </Grid>
      <Grid item>
        <YoadButn variant="outlined" onClick={() => {}}>
          Play Memory with Route
        </YoadButn>
      </Grid>
    </>
  );

  return tutorial ? (
    <Tutorial />
  ) : user && user.fullname ? (
    memory || response ? (
      memory ? (
        <Manager />
      ) : (
        <ResponseTime />
      )
    ) : (
      <>
        <Grid
          container
          wrap="nowrap"
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          height="90vh"
          width="100vw"
          overflow="hidden"
          bgcolor={NeurobicaColors.yea}
        >
          <Space percent="6" />
          <Grid item alignSelf="flex-start" paddingLeft="5%">
            <TypoYoadRoboto sx={{ fontSize: "1.6rem", fontFamily: "Roboto" }}>
              <b> Hello {(user && user.fullname) || "Guest"},</b>
            </TypoYoadRoboto>
            <TypoYoadRoboto sx={{ fontSize: "1.6rem" }}>
              <b> Ready to Test Your Brain?</b>
            </TypoYoadRoboto>
          </Grid>
          <Space percent="1" />
          {false && tbutns()}
          <Grid item>
            <Box
              onClick={() => navigate("/test")}
              component="img"
              src={img}
              sx={{
                aspectRatio: "1 / " + 668 / 1034,
                width: "100vw",
              }}
            ></Box>
          </Grid>
          <Space percent="4" />
          <Grid item alignSelf="flex-start" paddingLeft="5%">
            <TypoYoadRoboto sx={{ fontSize: "1.6rem" }}>
              <b>How're you doing:</b>
            </TypoYoadRoboto>
          </Grid>
          <Grid item height="90vw" width="90vw">
            <NewRadar />
          </Grid>
          {signout && <Signout />}
        </Grid>
        <LoginStatus />
        <BottomBar />
      </>
    )
  ) : (
    <SendToLogin />
  );
}

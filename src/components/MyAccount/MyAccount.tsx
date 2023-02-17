import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { TypoYoad } from "../../TypoYoad";
import domain from "../../util/domain";
import NeurobicaColors from "../../util/NeurobicaColors";
import LoginPage from "../Auth/Auth";
import StatusBar from "../StatusBar/StatusBar";
import logo from "../Tutorial/assets/logo.png";
import Checkbox from "@mui/material/Checkbox";
import BottomBar from "../BottomBar/BottomBar";

export default function MyAccount() {
  let { user } = useContext(UserContext);

  const [memory, setMemory] = useState<number[]>([]);
  const [response, setResponse] = useState<number[]>([]);

  const [notifications, setNotifications] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<boolean>(false);

  useEffect(() => {
    setNotifications(user?.notifications || false);
    setNewsletter(user?.newsletter || false);
  }, [user]);

  useEffect(() => {
    const getMemory = async () => {
      try {
        const scores = await axios.get(domain + "memory/getScores");
        const toProc = Array.from(
          new Set(scores.data.map((r: any) => r.result))
        );
        setMemory((toProc as number[]).filter((num: number) => num !== 0));
      } catch (e) {}
    };
    getMemory();
    const getResponse = async () => {
      try {
        const scores = await axios.get(domain + "response/getScores");
        const toProc = Array.from(
          new Set(scores.data.map((r: any) => r.result))
        );
        setResponse((toProc as number[]).filter((num: number) => num !== 0));
      } catch (e) {}
    };
    getResponse();
  }, []);

  const updateN = async (n: boolean, ne: boolean) =>
    await axios.post(domain + "user/updaten", {
      notifications: n,
      newsletter: ne,
    });

  const tests = Math.min(
    memory ? memory.length || 0 : 0,
    response ? response.length || 0 : 0
  );

  return user ? (
    <Box bgcolor={NeurobicaColors.yea} height="90vh" width="100vw">
      <StatusBar />
      <Box
        position="fixed"
        component="img"
        src={logo}
        sx={{
          aspectRatio: "1.75 / 1",
          width: "70%",
          left: "12%",
          top: "6%",
        }}
      />
      <Box
        position="fixed"
        width="100vw"
        sx={{
          top: "30%",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          height="50vh"
          width="100vw"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              height="50vh"
              justifyContent="space-between"
              alignItems="center"
              width="80vw"
              position="fixed"
              left="35%"
            >
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Neurons available</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>{user.neurons || "none yet"}</TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Tests completed</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>{tests}</TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Full Name</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>{user.fullname}</TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Email</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>{user.email}</TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>
                    Password{"  "}
                    <a style={{ color: "#CCCCCC" }} href="/forgotpass">
                      edit
                    </a>
                  </TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>*********</TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Notifications</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad align="center">
                    <Checkbox
                      checked={notifications}
                      onChange={(e: any) => {
                        setNotifications(!notifications);
                        updateN(!notifications, newsletter);
                      }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                          color: "#72c87a",
                        },
                      }}
                    />
                  </TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Newsletter</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad align="center">
                    <Checkbox
                      checked={newsletter}
                      onChange={(e: any) => {
                        setNewsletter(!newsletter);
                        updateN(notifications, !newsletter);
                      }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                          color: "#72c87a",
                        },
                      }}
                    />
                  </TypoYoad>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  right="100px"
                  position="relative"
                  width="40vw"
                  display="inline-block"
                >
                  <TypoYoad>Privacy policy</TypoYoad>
                </Box>
                <Box
                  position="relative"
                  width="40vw"
                  display="inline-block"
                  right="70px"
                >
                  <TypoYoad>ref</TypoYoad>
                </Box>
              </Grid>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <BottomBar />
    </Box>
  ) : (
    <LoginPage />
  );
}

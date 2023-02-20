import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Ai from "./Ai";
import POCM from "./POCM";
import NeurobicareColors from "./util/NeurobicareColors";

export default function AiOrPoc({ final }: any) {
  const [state, setState] = useState("none");
  const [uname, setUname] = useState("");

  return state[0] == "n" ? (
    <>
      <Modal
        open={state === "nopen"}
        onClose={() => setState("none")}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state === "nopen"}>
          <Box
            sx={{
              backgroundColor: NeurobicareColors.p3,
              color: NeurobicareColors.p0,
              position: "fixed",
              minWidth: "540px",
              maxWidth: "700px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              overflowX: "hidden",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "",
              },
            }}
            width="42vw"
            height="80vh"
            border="0.2rem solid #000"
            boxShadow={24}
            borderRadius="5vw"
            padding="4vw"
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowSpacing={10}
            >
              <Grid item>
                <Typography variant="h2">Enter Your uName:</Typography>
              </Grid>
              <Grid item>
                <TextField
                  sx={{ input: { fontSize: "200%" } }}
                  value={uname}
                  onChange={(e: any) => setUname(e.target.value)}
                >
                  asdad
                </TextField>
              </Grid>
              <Grid item>
                <Button
                  sx={{
                    color: NeurobicareColors.p3,
                    fontSize: "200%",
                    backgroundColor: NeurobicareColors.p0,
                    borderRadius: "35px",
                  }}
                  onClick={() => setState("ai")}
                >
                  Start
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      <Grid container direction="column" rowSpacing={4} textAlign="center">
        <Grid item>
          <Button
            sx={{
              color: NeurobicareColors.p3,
              fontSize: "200%",
              backgroundColor: NeurobicareColors.p0,
              borderRadius: "35px",
            }}
            variant="contained"
            onClick={() => setState("nopen")}
          >
            data
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{
              color: NeurobicareColors.p3,
              fontSize: "200%",
              backgroundColor: NeurobicareColors.p0,
              borderRadius: "35px",
            }}
            variant="contained"
            onClick={() => setState("poc")}
          >
            poc
          </Button>
        </Grid>
      </Grid>
    </>
  ) : state === "ai" ? (
    <Ai currentEEG={final} uname={uname} />
  ) : state === "poc" ? (
    <POCM final={final} />
  ) : null;
}

import Button from "@mui/material/Button";
import { EEGReading } from "muse-js/dist/lib/muse-interfaces";
import { useState } from "react";
import { connectToMuse } from "./muse/connection";
import { Observable, interval, from } from "rxjs";
import { map, flatMap } from "rxjs/operators";
import { addChannelSample } from "./store/reducers/museReducer";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import EEGProvider from "./EEGProvider";
import NeurobicareColors from "./comps/util/NeurobicareColors";
import { Typography } from "@mui/material";

import data1 from "./mock/datas.json";
import data2 from "./mock/datas2.json";

function App() {
  const [eegO, seteegO] = useState<Observable<EEGReading>>();
  const dispatch = useDispatch();

  eegO && eegO.subscribe((eeg) => dispatch(addChannelSample(eeg)));

  const mockDataJSON = [...data1, ...data2];
  let mockData = mockDataJSON.map((doc) => JSON.parse(doc.data));
  mockData = mockData.map((data) => ({ data: data.input.data }));

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor={NeurobicareColors.p4}
      padding="5%"
      margin={0}
    >
      {!eegO ? (
        <>
          <Grid item>
            <Button
              sx={{
                color: NeurobicareColors.p3,
                fontSize: "200%",
                backgroundColor: NeurobicareColors.p0,
                borderRadius: "35px",
              }}
              variant="contained"
              onClick={async () => seteegO((await connectToMuse()) as any)}
            >
              {eegO ? "disconnect" : "connect to physical muse"}
            </Button>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: "400%", color: "red" }}>
              ----------------
            </Typography>
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
              onClick={async () => seteegO(mockMuseEEG())}
            >
              {eegO ? "disconnect" : "connect to virtual muse"}
            </Button>
          </Grid>
        </>
      ) : (
        eegO && <EEGProvider />
      )}
    </Grid>
  );
}

const samples = () => {
  return Array(12)
    .fill()
    .map((_) => Math.random())
    .map(function (x) {
      return x * 100;
    });
};

const customCount = (start: any, end: any, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};

const transform = (index: number) => {
  const timestamp = Date.now();
  let chanNums = customCount(0, (window as any).nchans - 1);
  return from(chanNums).pipe(
    map((electrode) => ({
      timestamp,
      electrode,
      index,
      samples: samples(),
    }))
  );
};

const mockMuseEEG = (sampleRate = 256) => {
  let index = 0;
  return interval(1000 / sampleRate).pipe(
    map(() => (index += 1)),
    flatMap(transform)
  );
};

export default App;

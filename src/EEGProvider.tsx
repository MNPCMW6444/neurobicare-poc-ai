import Grid from "@mui/material/Grid";
import { epoch, fft, powerByBand } from "@neurosity/pipes";
import { useEffect, useState } from "react";
import { FrequencyBands } from "./constants";
import { FrequencyRangeInHz } from "./types";
import storeObservabler from "./muse/storeObservabler";
import { store } from "./store/store";
import { combineLatest } from "rxjs/operators";
import AiOrPoc from "./comps/AiOrPoc";

const freqnames = Object.keys(FrequencyBands);
const freqrange: FrequencyRangeInHz[] = Object.values(FrequencyBands);

const frequencyBands = {} as any;

freqnames.forEach((freqname: string, index: number) => {
  frequencyBands[freqname] = [
    freqrange[index].minFrequencyiInHz,
    freqrange[index].maxFrequencyiInHz,
  ];
});

export default function EEGProvider({ v }: { v: boolean }) {
  const [final, setFinal] = useState();

  const [all] = useState(storeObservabler(store));

  useEffect(() => {
    const proccesed =
      frequencyBands &&
      all.pipe(
        epoch({ duration: 256, interval: 100 }) as any,
        fft({ bins: 256 }) as any,
        powerByBand(frequencyBands) as any
      );

    const combined =
      proccesed &&
      all.pipe(
        combineLatest(proccesed, (firstValue: any, secondValue: any) => ({
          original: firstValue,
          proccesed: secondValue,
        }))
      );

    combined.subscribe((x: any) => {
      setFinal(x);
    });
  }, [all]);

  return (
    <>
      <Grid item>
        <AiOrPoc v={v} final={final} />
      </Grid>
    </>
  );
}

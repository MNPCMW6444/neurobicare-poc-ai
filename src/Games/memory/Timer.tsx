import React, { useEffect, useState } from "react";
import { TypoYoad } from "../../TypoYoad";
import { timeInSeconds } from "./settings";

export default function Timer({ otime }: any) {
  const [x, setX] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setX(timeInSeconds - Math.floor((new Date().getTime() - otime) / 1000)),
      500
    );

    return () => clearInterval(interval);
  }, []);

  return <TypoYoad variant="h5">{"Timer: " + x}</TypoYoad>;
}

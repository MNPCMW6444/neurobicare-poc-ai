import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { gameColor, GOLD } from "./Cards";

export default function NeurobiCard({
  n,
  i,
  j,
  hits,
  setHits,
  random,
  colorin,
}: any) {
  const [color, setColor] = useState<gameColor>(colorin);

  useEffect(() => {
    setColor(colorin);
  }, [colorin]);

  return (
    <Card
      sx={{
        width: (n < 6 ? 80 : n < 12 ? 70 : 60) / n + "vw",
        height: 60 / n + "vh",
        backgroundColor: color,
      }}
      onClick={() => {
        if (color === "black") {
          random[i][j] === GOLD
            ? setHits((prev: any) => {
                const y = hits.map((x: any) => x);
                y.push("V");
                return y;
              })
            : setHits((prev: any) => {
                const y = hits.map((x: any) => x);
                y.push("X");
                return y;
              });
          random[i][j] === GOLD ? setColor(GOLD) : setColor("red");
        }
      }}
    />
  );
}

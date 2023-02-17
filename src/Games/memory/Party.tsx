import React from "react";
import { YoadButn } from "../../YoadButn";

export default function Party({ onChange }: any) {
  setTimeout(() => onChange(false), 1);
  return (
    <YoadButn variant="outlined" onClick={() => onChange(false)}>
      continiue(1)
    </YoadButn>
  );
}

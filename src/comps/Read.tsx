import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import domain from "../util/domain";

export default function Read({ currentEEG }: any) {
  const [a, b] = useState(0);

  const aa = async () => {
    if (currentEEG) {
      let put = JSON.parse(JSON.stringify(currentEEG));

      delete put.original.timestamp;
      delete put.original.info;

      const toSend = { input: put };
      const res = await axios.post(domain + "/read", { ...toSend });
      b(res.data.answer);
      // a();
    }
  };
  /* 

  useEffect(() => {
   
  }, [currentEEG]); */

  return (
    <div>
      <Button onClick={aa}>click</Button>
      {" Read = " + JSON.stringify(a)}
    </div>
  );
}

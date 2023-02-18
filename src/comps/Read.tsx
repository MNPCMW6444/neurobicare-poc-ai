import axios from "axios";
import { useEffect, useState } from "react";
import domain from "../util/domain";

export default function Read({ currentEEG }: any) {
  const [a, b] = useState(0);

  useEffect(() => {
    if (currentEEG) {
      let put = JSON.parse(JSON.stringify(currentEEG));

      delete put.original.timestamp;
      delete put.original.info;

      const toSend = { input: put };

      const a = async () => {
        const res = await axios.post(domain + "/read", { ...toSend });
        b(res.data.answer);
      };

      a();

      // axios.get(domain + "/areyoualive");
    }
  }, [currentEEG]);

  return <div>Read = {a}</div>;
}

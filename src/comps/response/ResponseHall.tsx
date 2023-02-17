import axios from "axios";
import { useEffect } from "react";
import domain from "../util/domain";
import { avg } from "./ResponseTime";
import { TypoYoad } from "./TypoYoad";

export default function ResponseHall({ scores, setTrigerNext }: any) {
  useEffect(() => {
    const asyncSend = async () => {
      try {
        await axios.post(domain + "response/save", {
          score: avg(scores),
        });
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => setTrigerNext(true), 1);
    };
    asyncSend();
  }, []);

  return <TypoYoad>{avg(scores)}</TypoYoad>;
}

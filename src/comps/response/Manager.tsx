import { useEffect, useState } from "react";
import ResponseHall from "./ResponseHall";
import ResponseTime from "./ResponseTime";

export default function Manager({ foward }: any) {
  const [rounds, setRounds] = useState(1);
  const [scores, setScores] = useState([]);

  const [trigerNext, setTrigerNext] = useState<boolean>(false);

  useEffect(() => {
    trigerNext && foward();
  }, [trigerNext]);

  return rounds < 5 ? (
    <ResponseTime
      rounds={rounds}
      setRounds={setRounds}
      scores={scores}
      setScores={setScores}
    />
  ) : (
    <ResponseHall scores={scores} setTrigerNext={setTrigerNext} />
  );
}

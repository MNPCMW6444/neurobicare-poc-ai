import { useEffect, useState } from "react";
import { NUM_OF_ROUNDS } from "../../constants";
import ResponseHall from "./ResponseHall";
import ResponseTime from "./ResponseTime";

export default function Manager({ currentEEG }: any) {
  const [rounds, setRounds] = useState(1);
  const [scores, setScores] = useState([]);

  const [trigerNext, setTrigerNext] = useState<boolean>(false);

  useEffect(() => {
    //trigerNext && foward();
  }, [trigerNext]);

  return rounds <= NUM_OF_ROUNDS ? (
    <ResponseTime
      currentEEG={currentEEG}
      rounds={rounds}
      setRounds={setRounds}
      scores={scores}
      setScores={setScores}
    />
  ) : (
    <ResponseHall scores={scores} setTrigerNext={setTrigerNext} />
  );
}

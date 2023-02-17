import React, { Dispatch, SetStateAction, useState } from "react";
import ManagerM from "../../Games/memory/Manager";
import ManagerR from "../../Games/response/Manager";
import Intro from "./Intro";
import Outro from "./Outro";
import Trans from "./Trans";

interface StageType {
  num: number;
  name: String;
}

export default function Test() {
  const stages: StageType[] = [
    {
      num: 1,
      name: "Intro",
    },
    {
      num: 2,
      name: "Memory",
    },
    {
      num: 3,
      name: "Trans",
    },
    {
      num: 4,
      name: "Response",
    },
    {
      num: 5,
      name: "Outro",
    },
  ];

  const foward = () => {
    setCurrentStage((current: StageType) => stages[current.num]);
  };

  const [currentStage, setCurrentStage] = useState<StageType>(stages[0]);

  switch (currentStage.num) {
    case 1:
      return <Intro foward={foward} />;

    case 2:
      return <ManagerM foward={foward} />;

    case 3:
      return <Trans foward={foward} />;

    case 4:
      return <ManagerR foward={foward} />;

    case 5:
      return <Outro foward={foward} />;
  }

  return <div>Test</div>;
}

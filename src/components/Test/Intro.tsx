import React from "react";
import Tutorial from "../Tutorial/Tutorial";

export default function Intro({ foward }: any) {
  return (
    <Tutorial
      isTest
      foward={foward}
      c1={
        "The following test contains 3 parts: Working memory, attention and speed and flexibility. Each part will take 1 minute to complete."
      }
      c2={
        "Please make sure to sleep at-least 7 hours before the test and to avoid drugs and alcohol 24 hours before the test."
      }
      c3={
        "After completing the test, your score will appear under “Check your gains” on our Homepage."
      }
    />
  );
}

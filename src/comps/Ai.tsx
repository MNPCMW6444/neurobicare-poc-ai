import Manager from "./response/Manager";
import ResponseHall from "./response/ResponseHall";

export default function Ai({ currentEEG }: any) {
  return <Manager currentEEG={currentEEG} />;
}

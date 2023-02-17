import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NeurobicaColors from "./util/NeurobicaColors";

export const YoadButn = styled(Button)(({ theme }) => ({
  "&": {
    color: NeurobicaColors.gold,
    outlineColor: "red",
  },
})) as typeof Button;

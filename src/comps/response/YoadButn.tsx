import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NeurobicaColors from "./NeurobicaColors";

export const YoadButn = styled(Button)(({ theme }) => ({
  "&": {
    color: NeurobicaColors.gold,
    outlineColor: "red",
  },
})) as typeof Button;

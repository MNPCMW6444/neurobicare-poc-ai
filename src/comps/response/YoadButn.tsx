import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NeurobicareColors from "../util/NeurobicareColors";

export const YoadButn = styled(Button)(({ theme }) => ({
  "&": {
    color: NeurobicareColors.p4,
    outlineColor: "red",
  },
})) as typeof Button;

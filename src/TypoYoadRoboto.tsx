import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const TypoYoadRoboto = styled(Typography)(({ theme }) => ({
  "&": {
    color: "#CCCCCC",
    fontFamily: "Roboto",
    fontWeight: 900,
  },
})) as typeof Typography;

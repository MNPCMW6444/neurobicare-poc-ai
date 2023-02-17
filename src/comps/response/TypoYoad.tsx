import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const TypoYoad = styled(Typography)(({ theme }) => ({
  "&": {
    color: "#CCCCCC",
    fontFamily: "Open Sans",
    fontWeight: 900,
  },
})) as typeof Typography;

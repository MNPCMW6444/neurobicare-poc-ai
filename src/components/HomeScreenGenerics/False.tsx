import Box from "@mui/material/Box";
import maybe from "../../assets/weekly/no.png";

export default function Maybe() {
  return (
    <Box
      component="img"
      src={maybe}
      sx={{ height: "40px", width: "40px" }}
    ></Box>
  );
}

import Box from "@mui/material/Box";
import maybe from "../../assets/weekly/maybe.png";

export default function Maybe() {
  return (
    <Box
      component="img"
      src={maybe}
      sx={{ height: "45px", width: "45px" }}
    ></Box>
  );
}

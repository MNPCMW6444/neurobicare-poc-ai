import Box from "@mui/material/Box";
import maybe from "../../assets/weekly/yes.png";

export default function True() {
  return (
    <Box
      component="img"
      src={maybe}
      sx={{ height: "30px", width: "30px" }}
    ></Box>
  );
}

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useState } from "react";
import NeurobicaColors from "../../util/NeurobicaColors";
import Box from "@mui/material/Box";

export default function BottomBar() {
  const [value, setValue] = useState<string>();

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(value, newValue) => {
        //setValue(newValue);
      }}
      sx={{
        backgroundColor: NeurobicaColors.yea,
        height: "10%",
        position: "fixed",
        bottom: "0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BottomNavigationAction
        sx={{ color: NeurobicaColors.gold }}
        // href="/train-my-brain"
        label="Comming Soon!"
        icon={<FitnessCenterIcon />}
      />
      <BottomNavigationAction
        sx={{ color: NeurobicaColors.gold }}
        href="/"
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        sx={{ color: NeurobicaColors.gold }}
        //  href="/my-brain"
        label="Comming Soon!"
        icon={<PsychologyOutlinedIcon />}
      />
    </BottomNavigation>
  );
}

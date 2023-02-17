import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TypoYoad } from "../../TypoYoad";
import False from "./False";
import Maybe from "./Maybe";
import True from "./True";

type Trilian = true | false | undefined;

interface WeeklyProps {
  defaultBooleanWeek: Trilian[];
  width?: string;
}

const Weekly = ({ defaultBooleanWeek, width }: WeeklyProps) => {
  return (
    <Box width={width || "100%"}>
      <TypoYoad variant="h4"> Your Week Streak!</TypoYoad>
      <Grid
        container
        wrap="nowrap"
        justifyContent="space-around"
        alignItems="center"
      >
        {defaultBooleanWeek.map((day) =>
          day === undefined ? <Maybe /> : day === true ? <True /> : <False />
        )}
      </Grid>
    </Box>
  );
};

export default Weekly;

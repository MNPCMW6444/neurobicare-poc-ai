import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TypoYoad } from "../../TypoYoad";
import NeurobicaColors from "../../util/NeurobicaColors";

const TutorialCard = ({ content }: any) => (
  <Card sx={{ backgroundColor: NeurobicaColors.yea }}>
    <CardContent>
      {/* <Typography variant="h2" component="h2">
        All Your Brain Needs
      </Typography> */}
      <TypoYoad align="center" variant="h6" component="p" color="white">
        {content}
      </TypoYoad>
    </CardContent>
  </Card>
);

export default TutorialCard;

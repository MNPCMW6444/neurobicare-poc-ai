import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeurobicaColors from "../../util/NeurobicaColors";
import { YoadButn } from "../../YoadButn";
import TutorialCard from "./TutorialCard";
import text from "./assets/text.png";
import brainny from "./assets/brainny.png";
import photo from "./assets/photo.png";
import logo from "./assets/logo.png";

const gold = createTheme({
  palette: {
    primary: {
      main: NeurobicaColors.gold,
    },
  },
});

const Tutorial = ({ isTest, foward, c1, c2, c3 }: any) => {
  const [activeStep, setActiveStep] = useState(0);
  const nav = useNavigate();
  const handleNext = () => {
    activeStep !== 2
      ? setActiveStep((prevActiveStep: any) => prevActiveStep + 1)
      : foward
      ? foward()
      : nav("/");
  };

  return (
    <>
      {!isTest && (activeStep === 0 || activeStep === 1) && (
        <Box
          position="fixed"
          component="img"
          src={logo}
          sx={{ aspectRatio: "1.75 / 1", width: "20%", top: "2%", left: "3%" }}
        />
      )}
      {!isTest && activeStep === 0 && (
        <Box
          position="fixed"
          component="img"
          src={text}
          sx={{ aspectRatio: "1 / 1", width: "52%", top: "9%" }}
        />
      )}
      {(isTest || activeStep === 1) && (
        <Box
          position="fixed"
          component="img"
          src={brainny}
          sx={{ aspectRatio: "1 / 1", width: "55%", top: "6%", left: "25%" }}
        />
      )}
      {!isTest && activeStep === 2 && (
        <Box
          position="fixed"
          component="img"
          src={photo}
          sx={{ aspectRatio: "1 / 1", width: "50%", top: "9%", left: "26%" }}
        />
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        bgcolor={NeurobicaColors.yea}
        rowSpacing={4}
      >
        <Grid item>
          {activeStep === 0 && (
            <TutorialCard
              content={
                c1 ||
                "Welcome to Neurobica App. You will soon enter our Alpha version. Beta version will be available on March 2023!"
              }
            />
          )}
          {activeStep === 1 && (
            <TutorialCard
              content={
                c2 ||
                "Earn “Neurons” by taking tests,  training your brain and completing challenges use them to get special discounts, deals and more!"
              }
            />
          )}
          {activeStep === 2 && (
            <TutorialCard
              content={
                c3 ||
                "With Neurobica you can train your brain, measure progress and learn valuable new lessons about brain health!"
              }
            />
          )}
        </Grid>
        <Grid item>
          <Stepper activeStep={activeStep} nonLinear>
            <Step>
              <StepButton onClick={() => setActiveStep(0)}></StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => setActiveStep(1)}></StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => setActiveStep(2)}></StepButton>
            </Step>
          </Stepper>
        </Grid>
        <Grid item>
          <ThemeProvider theme={gold}>
            <YoadButn
              variant="outlined"
              onClick={handleNext}
              disabled={activeStep === 3}
              sx={{
                borderRadius: "30px",
              }}
            >
              {activeStep === 2 ? "Get Started!" : "Next"}
            </YoadButn>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default Tutorial;

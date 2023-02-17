import "./authStyle.css";
import NeurobicaLogo from "../NeurobicaLogo/NeurobicaLogo";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { passwordStrength } from "check-password-strength";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Badge from "@mui/icons-material/Badge";
import Lock from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "react-notifications-component";
import Button from "@mui/material/Button";
import { TypoYoad } from "../../TypoYoad";
import domain from "../../util/domain";

export default function Forgot() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isAdvanced, setIsAdvanceed] = useState(false);
  const [isAllowedToSignIn, setSsAllowedToSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [label, setLabel] = useState<string>(
    isSignIn ? "Send me a reset key" : "Continiue"
  );

  let navigate = useNavigate();

  const [state, setState] = useState<{
    checkedA: boolean;
    checkedB: boolean;
    checkedF: boolean;
    checkedG: boolean;
  }>({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [state2, setState2] = useState<{
    checkedA: boolean;
    checkedB: boolean;
    checkedF: boolean;
    checkedG: boolean;
  }>({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState2({ ...state, [event.target.name]: event.target.checked });
  };

  const emailValidation =
    email.includes("+") ||
    !(
      email.includes("@") &&
      email.indexOf("@") !== 0 &&
      email.indexOf("@") !== email.length - 1
    );

  console.log(email.indexOf("@"));
  console.log(email.indexOf("@"));

  const passwordValidation =
    passwordStrength(password).value === "Strong" ||
    passwordStrength(password).value === "Medium";

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 4, md: 4 }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="5vh"
    >
      <Grid item xs={4}>
        <NeurobicaLogo c={5} />
      </Grid>
      <Grid item xs={4}>
        <Box className="loginPageSignInSignUp"></Box>
        {isSignIn ? (
          <Box
            component="form"
            sx={{
              m: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
          </Box>
        ) : isAdvanced ? (
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={false}
                type="text"
                variant="standard"
                label="Full Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge />
                    </InputAdornment>
                  ),
                }}
                value={fullname}
                placeholder="Enter Your Full Name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </Box>
            <TextField
              sx={{
                m: 0,
                width: "40vh",
              }}
              error={!passwordValidation}
              type="password"
              variant="standard"
              label="key"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              value={key}
              placeholder="Enter Your Key (check you email inbox)"
              onChange={(e) => setKey(e.target.value)}
            />{" "}
            <TextField
              sx={{
                m: 0,
                width: "40vh",
              }}
              error={false}
              type="password"
              variant="standard"
              label={
                passwordValidation === false
                  ? "Password must include 8 character or more and include at least 1 lowercase, uppercase, number and symbol charactors"
                  : "Password"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Box>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={password !== passwordagain}
                type="password"
                variant="standard"
                label="Confirm Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                value={passwordagain}
                placeholder="Confirm Your Password"
                onChange={(e) => {
                  setPasswordagain(e.target.value);
                }}
              />

              <Grid container wrap="nowrap">
                <Grid item>
                  {" "}
                  <FormControlLabel
                    label={
                      <Box>
                        <span>I accept the </span>
                        <Link to={"/termsvf"}>
                          terms of use and privacy policy
                        </Link>
                      </Box>
                    }
                    sx={{
                      color: "GrayText",
                      width: "35vh",
                    }}
                    control={
                      <Checkbox
                        sx={{
                          fontSize: "28",
                        }}
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="default"
                        size="small"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <Box>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
          </Box>
        )}
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            m: 0,
            width: "40vh",
          }}
          error={!passwordValidation}
          type="password"
          variant="standard"
          label="key"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={key}
          placeholder="Enter Your Key (check you email inbox)"
          onChange={(e) => setKey(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            m: 0,
            width: "40vh",
          }}
          error={false}
          type="password"
          variant="standard"
          label={
            passwordValidation === false
              ? "Password must include 8 character or more and include at least 1 lowercase, uppercase, number and symbol charactors"
              : "Password"
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={password}
          placeholder="Enter Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          sx={{
            m: 0,
            width: "40vh",
          }}
          error={password !== passwordagain}
          type="password"
          variant="standard"
          label="Confirm Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={passwordagain}
          placeholder="Confirm Your Password"
          onChange={(e) => {
            setPasswordagain(e.target.value);
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <Button
          onClick={async () => {
            if (label === "Send me a reset key") {
              await axios.post(domain + "user/passresreq", { email });
              setLabel("continue");
            } else
              await axios.post(domain + "user/passresfin", {
                email,
                key,
                password,
                passwordagain,
              });
          }}
        >
          {label}
        </Button>
      </Grid>
    </Grid>
  );
}

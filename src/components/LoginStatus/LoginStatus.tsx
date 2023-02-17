import "./loginStatus.css";
import { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Signout from "../Signout/Signout";
import React from "react";
import UserContext from "../../context/UserContext";
import Box from "@mui/material/Box";
import { YoadButn } from "../../YoadButn";
import { Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LoginStatus() {
  const [signOut, setSignOut] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSignOut(true);
  };

  const { user } = useContext(UserContext);

  const nav = useNavigate();

  return (
    <Box
      sx={{
        height: "5%",
        position: "fixed",
        top: "0",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {user ? (
        <Box>
          <YoadButn
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {/*             {user.fullname.split(" ")[0]}
             */}
            <Person />
          </YoadButn>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => nav("/my-account")}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      ) : (
        <YoadButn
          variant="outlined"
          href="../../my-account"
          sx={{
            color: "GrayText",
            border: "HighlightText",
          }}
        >
          Login
        </YoadButn>
      )}
      {signOut && <Signout />}
    </Box>
  );
}

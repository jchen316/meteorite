import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import nasaLogo from "../../assets/NASA_logo.svg";
import Confetti from "react-confetti";

export default function ButtonAppBar() {
  const [confettiOn, setConfettiOn] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NASA's Open Data Portal
          </Typography>
          <img
            src={nasaLogo}
            className="logo nasa"
            alt="Nasa logo"
            onClick={() => {
              setConfettiOn(!confettiOn);
            }}
          />
          {confettiOn && <Confetti numberOfPieces={200} recycle={false} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

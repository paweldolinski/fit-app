import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logOut, userObj } = useContext(UserContext);

    console.log(isLoggedIn)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        p: 3,
        "a,hr": {
          m: 1.3,
        },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {isLoggedIn && <p>{userObj.name}</p>}
      <Link href="/workout-history">Workout history</Link>
      <Link href="/workout">Workout</Link>
      <Divider />
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
      {isLoggedIn && <Button onClick={logOut}>Log Out</Button>}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open</Button>
      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, userObj, setUserObj } = useContext(UserContext);

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
      {userObj && <p>{userObj.name}</p>}
      <Link href="/workout-history">Workout history</Link>
      <Link href="/workout">Workout</Link>
      <Divider />
      <Link href="/">Home</Link>

      {userObj.name ? (
        <>
          <Link href={"/user-profile"}>User Profile</Link>
          <Button onClick={logOut}>Log Out</Button>
        </>
      ) : (
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </Box>
  );

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserObj(user);
    }
  }, []);
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

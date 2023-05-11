"use client";

import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const { fireUser, logOut } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logOut();
      showToast("Log Out Successful!", "success");
    } catch (error) {
      showToast(`Log Out Failed`, "error");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static" variant="elevation">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href={fireUser ? "/dashboard" : "/"}>
              <Typography variant="h6" component="div">
                Score Keeper
              </Typography>
            </Link>
          </Box>
          {/* {fireUser ? (
            <Box>
              <Link href="/dashboard">
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Link href="/dashboard/game/new">
                <Button color="inherit">New Game</Button>
              </Link>
              <Link href="/dashboard/friends">
                <Button color="inherit">Friends</Button>
              </Link>
              <Button color="inherit" onClick={() => handleLogout()}>
                Log Out
              </Button>
            </Box>
          ) : (
            <Box>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/signup">
                <Button color="inherit">Signup</Button>
              </Link>
            </Box>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

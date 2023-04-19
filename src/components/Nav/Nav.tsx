"use client";

import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { UserAuth } from "@/contexts/AuthContext";
import { useToast } from "@/providers/ToastProvider";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const { fireUser, logOut } = UserAuth();
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="elevation">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href={fireUser ? "/dashboard" : "/"}>
              <Typography variant="h6" component="div">
                Tally Board
              </Typography>
            </Link>
            {fireUser ? (
              <Typography variant="h5" component="div">
                {fireUser.displayName}
              </Typography>
            ) : null}
          </Box>
          {fireUser ? (
            <Box>
              <Link href="/dashboard">
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Button color="inherit" onClick={() => handleLogout()}>
                Log Out
              </Button>
            </Box>
          ) : (
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

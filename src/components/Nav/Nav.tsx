"use client";

import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { UserAuth } from "@/contexts/AuthContext";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const { user, logOut } = UserAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Typography variant="h6" component="div">
                Score Keeper
              </Typography>
            </Link>
          </Box>
          {user ? (
            <Box>
              <Link href="/dashboard">
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Button color="inherit" onClick={() => logOut()}>
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

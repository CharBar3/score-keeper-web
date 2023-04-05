"use client";
import { getUserGames } from "@/Database/Database";
import { Button, Link, MenuItem, MenuList, Paper } from "@mui/material";
import { FC, useEffect } from "react";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = () => {
  useEffect(() => {
    getUserGames("1");
    // return () => {
    //   second
    // }
  }, []);

  return (
    <Link href="/dashboard/newgame" sx={{ all: "unset" }}>
      <Button variant="contained">New Game!</Button>
    </Link>
    // <Paper>
    //   <MenuList>
    //     <MenuItem>New Game</MenuItem>
    //     <MenuItem>My Games</MenuItem>
    //     <MenuItem>Logout</MenuItem>
    //   </MenuList>
    // </Paper>
  );
};

export default DashboardNav;

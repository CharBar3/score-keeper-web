"use client";
import { getUserGames } from "@/database/database";
import { FC, useEffect } from "react";
import { Button, MenuItem, MenuList, Paper } from "@mui/material";
import Link from "next/link";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = () => {
  useEffect(() => {
    getUserGames("1");
    // return () => {
    //   second
    // }
  }, []);

  return (
    <Link href="/dashboard/newgame">
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

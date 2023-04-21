"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = () => {
  return (
    <>
      <Link href="/dashboard/newgame">
        <Button variant="contained">New Game!</Button>
      </Link>
      <Link href="/dashboard/friends">
        <Button variant="contained">Add Friend</Button>
      </Link>
    </>
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

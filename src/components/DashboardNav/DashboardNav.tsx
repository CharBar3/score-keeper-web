"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface DashboardNavProps {}

const DashboardNav: FC<DashboardNavProps> = () => {
  return (
    <div>
      {/* <Link href="/dashboard/newgame">
        <Button variant="contained">New Game!</Button>
      </Link>
      <Link href="/dashboard/friends">
        <Button variant="contained">Add Friend</Button>
      </Link> */}
    </div>
  );
};

export default DashboardNav;

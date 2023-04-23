"use client";

import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface FriendNavProps {}

const FriendNav: FC<FriendNavProps> = () => {
  const pathname = usePathname();

  if (pathname === "/dashboard/friends") {
    return (
      <div>
        <ButtonGroup variant="contained">
          <Link href="/dashboard/friends">
            <Button sx={{ backgroundColor: "red" }}>My Friends</Button>
          </Link>
          <Link href="/dashboard/friends/add">
            <Button>Add New Friends</Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  } else {
    return (
      <div>
        <ButtonGroup variant="contained">
          <Link href="/dashboard/friends">
            <Button>My Friends</Button>
          </Link>
          <Link href="/dashboard/friends/add">
            <Button sx={{ backgroundColor: "red" }}>Add New Friends</Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  }
};

export default FriendNav;

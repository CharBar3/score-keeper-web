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
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup variant="contained">
          <Link href="/dashboard/friends">
            <Button>My Friends</Button>
          </Link>
          <Link href="/dashboard/friends/add">
            <Button sx={{ backgroundColor: "lightGrey" }}>
              Add New Friends
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  } else {
    return (
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonGroup variant="contained">
          <Link href="/dashboard/friends">
            <Button sx={{ backgroundColor: "lightGrey" }}>My Friends</Button>
          </Link>
          <Link href="/dashboard/friends/add">
            <Button>Add New Friends</Button>
          </Link>
        </ButtonGroup>
      </div>
    );
  }
};

export default FriendNav;

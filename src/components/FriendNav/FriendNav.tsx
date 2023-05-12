"use client";

import { Button, ButtonGroup } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import BottomBar from "../BottomBar/BottomBar";

interface FriendNavProps {}

const FriendNav: FC<FriendNavProps> = () => {
  const pathname = usePathname();

  return (
    <BottomBar>
      <Link href="/dashboard">
        <Button variant="dark" sx={{ marginRight: 1 }}>
          Dashboard
        </Button>
      </Link>
      {pathname === "/dashboard/friends" && (
        <Link href="/dashboard/friends/add">
          <Button variant="blue" sx={{ marginLeft: 1 }}>
            Add Friends
          </Button>
        </Link>
      )}
      {pathname === "/dashboard/friends/add" && (
        <Link href="/dashboard/friends/">
          <Button variant="dark" sx={{ marginLeft: 1 }}>
            My Friends
          </Button>
        </Link>
      )}
    </BottomBar>
  );

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

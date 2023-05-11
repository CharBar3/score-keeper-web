"use client";

import { FC } from "react";
import BottomBar from "../BottomBar/BottomBar";
import { Button } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/providers/Auth";

interface HomeNavProps {}

const HomeNav: FC<HomeNavProps> = () => {
  const { fireUser } = useAuth();
  return (
    <BottomBar>
      {fireUser && (
        <Link href="/dashboard">
          <Button variant="dark">Dashboard</Button>
        </Link>
      )}
      {!fireUser && (
        <>
          <Link href="/login">
            <Button variant="dark" sx={{ width: "90px" }}>
              Login
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="dark"
              sx={{ width: "90px", marginLeft: 1, marginRight: 1 }}
            >
              About
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="dark" sx={{ width: "90px" }}>
              Signup
            </Button>
          </Link>
        </>
      )}
    </BottomBar>
  );
};

export default HomeNav;

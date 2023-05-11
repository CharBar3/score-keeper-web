"use client";
import { FC } from "react";
import BottomBar from "../BottomBar/BottomBar";
import { Button } from "@mui/material";
import Link from "next/link";

interface GameNavProps {
  gameId: string;
}

const GameNav: FC<GameNavProps> = ({ gameId }) => {
  return (
    <BottomBar>
      <Link href={`/dashboard/game/${gameId}/settings`}>
        <Button variant="dark" sx={{ marginRight: 1, width: "125px" }}>
          Settings
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button variant="dark" sx={{ marginLeft: 1, width: "125px" }}>
          Dashboard
        </Button>
      </Link>
    </BottomBar>
  );
};

export default GameNav;

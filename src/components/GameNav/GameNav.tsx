"use client";
import { FC } from "react";
import BottomBar from "../BottomBar/BottomBar";
import { Button } from "@mui/material";
import Link from "next/link";
import { useDataStore } from "@/providers/User";

interface GameNavProps {
  gameId: string;
}

const GameNav: FC<GameNavProps> = ({ gameId }) => {
  const { user } = useDataStore();
  return (
    <BottomBar>
      <Link href="/dashboard">
        <Button variant="dark" sx={{ marginRight: 1, width: "125px" }}>
          Dashboard
        </Button>
      </Link>
      <Link href={`/dashboard/game/${gameId}/settings`}>
        <Button variant="dark" sx={{ marginLeft: 1, width: "125px" }}>
          Settings
        </Button>
      </Link>
    </BottomBar>
  );
};

export default GameNav;

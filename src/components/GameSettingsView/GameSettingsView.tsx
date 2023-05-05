"use client";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useGame } from "@/providers/Game";
import { useDataStore } from "@/providers/User";
import { redirect } from "next/navigation";

interface GameSettingsViewProps {
  gameId: string;
}

const GameSettingsView: FC<GameSettingsViewProps> = ({ gameId }) => {
  const { setGameId, liveGame } = useGame();
  const { user } = useDataStore();

  useEffect(() => {
    if (user && liveGame && user.id != liveGame.ownerId) {
      redirect(`/dashboard/game/${liveGame.id}`);
    }
    console.log("settings reload");
    setGameId(gameId);
  }, [gameId, setGameId, user, liveGame]);

  return (
    <Stack>
      <Typography variant="h1">Game Settings</Typography>
      {!liveGame ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm game={liveGame} />
      )}
    </Stack>
  );
};

export default GameSettingsView;

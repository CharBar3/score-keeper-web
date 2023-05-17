"use client";
import { useGame } from "@/providers/Game";
import { useDataStore } from "@/providers/User";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";

interface GameSettingsViewProps {
  gameId: string;
}

const GameSettingsView: FC<GameSettingsViewProps> = ({ gameId }) => {
  const { setGameId, liveGame } = useGame();
  const { user } = useDataStore();
  const theme = useTheme();

  return (
    <Stack sx={{ margin: "auto", maxWidth: "600px" }}>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
      >
        Game Settings
      </Typography>
      {!liveGame || !user ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm game={liveGame} user={user} />
      )}
    </Stack>
  );
};

export default GameSettingsView;

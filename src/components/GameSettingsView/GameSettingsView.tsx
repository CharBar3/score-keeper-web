"use client";
import { useGame } from "@/providers/Game";
import { useDataStore } from "@/providers/User";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useRouter } from "next/navigation";
import { Role } from "@/models";

interface GameSettingsViewProps {
  gameId: string;
}

const GameSettingsView: FC<GameSettingsViewProps> = ({ gameId }) => {
  const { setGameId, game, activePlayer } = useGame();
  const { user } = useDataStore();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (activePlayer?.role != Role.Owner) {
      router.push(`/dashboard/game/${gameId}`);
    }

    setGameId(gameId);
  }, [activePlayer, router, setGameId, gameId]);

  return (
    <Stack sx={{ margin: "auto", maxWidth: "600px" }}>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{ color: theme.palette.primary.main, marginBottom: 2 }}
      >
        Game Settings
      </Typography>
      {!game || !user ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm game={game} user={user} />
      )}
    </Stack>
  );
};

export default GameSettingsView;

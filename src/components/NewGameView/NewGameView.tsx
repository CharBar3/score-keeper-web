"use client";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useDataStore } from "@/providers/User";
import { useTheme } from "@mui/material/styles";

interface NewGameViewProps {}

const NewGameView: FC<NewGameViewProps> = () => {
  const theme = useTheme();
  const { user } = useDataStore();

  return (
    <Stack>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{ color: theme.palette.primary.main }}
      >
        New Game
      </Typography>
      {!user ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm user={user} />
      )}
    </Stack>
  );
};

export default NewGameView;

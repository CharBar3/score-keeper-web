"use client";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useDataStore } from "@/providers/User";

interface NewGameViewProps {}

const NewGameView: FC<NewGameViewProps> = () => {
  const { user } = useDataStore();

  return (
    <Stack>
      <Typography variant="h1">New Game</Typography>
      {!user ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm user={user} />
      )}
    </Stack>
  );
};

export default NewGameView;

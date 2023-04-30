"use client";
import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useDataStore } from "@/providers/User";

interface NewGameViewProps {}

const NewGameView: FC<NewGameViewProps> = () => {
  const { generateRandomColor } = useDataStore();
  return (
    <Stack>
      <Typography variant="h1">New Game</Typography>
      <GameInfoForm gameColor={generateRandomColor()} />
    </Stack>
  );
};

export default NewGameView;

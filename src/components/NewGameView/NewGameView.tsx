"use client";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";

interface NewGameViewProps {}

const NewGameView: FC<NewGameViewProps> = () => {
  return (
    <Stack>
      <Typography variant="h1">New Game</Typography>
      <GameInfoForm />
    </Stack>
  );
};

export default NewGameView;

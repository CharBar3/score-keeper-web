"use client";

import { DatabaseService } from "@/services/database-service";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { useLiveGame } from "@/providers/LiveGame";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  // const [game, setGame] = useState<Game | null>(null);
  const { liveGame: game } = useLiveGame();

  if (!game) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const showPlayers = game.players.map((player, index) => {
    return <PlayerCard key={index} player={player} />;
  });

  return (
    <div>
      <Typography variant="h1">{game.title}</Typography>
      <Typography variant="h4">{game.info}</Typography>
      <Typography variant="h5">Game Owner: {game.ownerId}</Typography>
      <Typography variant="h5">Game Admins: {game.adminIds}</Typography>
      <ButtonGroup>
        <Button>Add Player</Button>
        <Button>Add Guest Player</Button>
      </ButtonGroup>
      {showPlayers}
    </div>
  );
};

export default GameView;

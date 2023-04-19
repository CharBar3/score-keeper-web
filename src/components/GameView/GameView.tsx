"use client";

import { useLiveGame } from "@/providers/LiveGame";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { FC } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  // const [game, setGame] = useState<Game | null>(null);
  const { liveGame: game, addGuestPlayer } = useLiveGame();

  if (!game) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const showPlayers = game.players.map((player, index) => {
    return <PlayerCard key={player.id} player={player} />;
  });
  const showGuestPlayers = game.guestPlayers.map((guestPlayer, index) => {
    return (
      <div key={guestPlayer.id}>
        <h1>{guestPlayer.name}</h1>
        <h2>{guestPlayer.score}</h2>
        <p>{guestPlayer.notes}</p>
      </div>
    );
  });

  const handleClick = async () => {
    try {
      await addGuestPlayer({
        name: "Guest name test",
        notes: "guest notes test",
        score: 699,
      });
    } catch (error) {}
  };

  return (
    <div>
      <Typography variant="h1">{game.title}</Typography>
      <Typography variant="h4">{game.info}</Typography>
      <ButtonGroup>
        <Button>Add Player</Button>
        <Button onClick={handleClick}>Add Guest Player</Button>
      </ButtonGroup>
      {showPlayers}
      {showGuestPlayers}
    </div>
  );
};

export default GameView;

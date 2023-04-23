"use client";

import { useGame } from "@/providers/Game";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { FC } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Role } from "@/models";
import AddPlayerModal from "../AddPlayerModal/AddPlayerModal";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  // const [game, setGame] = useState<Game | null>(null);
  const { liveGame: game, addGuestPlayer } = useGame();

  if (!game) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const showPlayers = game.players.map((player, index) => {
    return <PlayerCard key={player.id} player={player} />;
  });
  // const showGuestPlayers = game.guestPlayers.map((guestPlayer, index) => {
  //   return (
  //     <PlayerCard key={guestPlayer.id} player={guestPlayer} gameId={game.id} />
  //   );
  // });

  const handleClick = async () => {
    try {
      await addGuestPlayer({
        name: "Guest name test",
        notes: "guest notes test",
        score: 699,
        role: Role.Edit,
        isGuest: true,
      });
    } catch (error) {}
  };

  return (
    <div>
      <Typography variant="h1">{game.title}</Typography>
      <Typography variant="h4">{game.info}</Typography>
      <ButtonGroup>
        <AddPlayerModal />
        {/* <Button>Add Player</Button> */}
        <Button onClick={handleClick}>Add Guest Player</Button>
      </ButtonGroup>
      {showPlayers}
    </div>
  );
};

export default GameView;

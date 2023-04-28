"use client";

import { useGame } from "@/providers/Game";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Role } from "@/models";
import AddPlayerModal from "../AddPlayerModal/AddPlayerModal";
import { GameService } from "@/services/game-service";
import Grid from "@mui/material/Unstable_Grid2";
import { theme } from "@/config/theme";

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
    return (
      <Grid key={player.id} xs={6} sm={6} md={6} lg={4} xl={4}>
        <PlayerCard
          key={player.id}
          id={player.id}
          name={player.name}
          role={player.role}
          score={player.score}
          notes={player.notes}
          isGuest={player.isGuest}
          color={player.color}
        />
      </Grid>
    );
  });

  const handleClick = async () => {
    try {
      await addGuestPlayer({
        name: "Guest name test",
        notes: "guest notes test",
        score: 0,
        role: Role.View,
        isGuest: true,
        color: GameService.colorGenerator(),
      });
    } catch (error) {}
  };

  return (
    <div>
      <Typography textAlign="center" variant="h1">
        {game.title}
      </Typography>
      <Typography textAlign="center" variant="h4">
        {game.info}
      </Typography>
      <Stack>
        <ButtonGroup>
          <AddPlayerModal />
          {/* <Button>Add Player</Button> */}
          <Button onClick={handleClick}>Add Guest Player</Button>
        </ButtonGroup>
        <Grid
          container
          spacing={{ xxs: 1, xs: 2, sm: 2, md: 4, lg: 4 }}
          sx={{
            margin: "auto",
            maxWidth: "1536px",
          }}
        >
          {showPlayers}
        </Grid>
      </Stack>
    </div>
  );
};

export default GameView;

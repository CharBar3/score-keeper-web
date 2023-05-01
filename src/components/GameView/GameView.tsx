"use client";

import { useGame } from "@/providers/Game";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { Role } from "@/models";
import { GameService } from "@/services/game-service";
import Grid from "@mui/material/Unstable_Grid2";
import { theme } from "@/config/theme";
import Link from "next/link";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  const { liveGame, addGuestPlayer, setGameId } = useGame();

  useEffect(() => {
    setGameId(id);
  }, [id, setGameId]);

  const adminIds: string[] = [];
  if (!liveGame) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  liveGame.players.map((player) => {
    if (player.role === Role.Admin) {
      adminIds.push(player.id);
    }
  });

  const showPlayers = liveGame.players.map((player, index) => {
    return (
      <Grid key={player.id} xs={6} sm={6} md={6} lg={4} xl={4}>
        <PlayerCard
          key={player.id}
          id={player.id}
          name={player.name}
          role={player.role}
          score={player.score}
          notes={player.notes}
          color={player.color}
          adminIds={adminIds}
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
        role: Role.Guest,

        color: GameService.colorGenerator(),
      });
    } catch (error) {}
  };

  return (
    <div>
      <Typography textAlign="center" variant="h1">
        {liveGame.title}
      </Typography>
      <Typography textAlign="center" variant="h4">
        {liveGame.info}
      </Typography>
      {}
      <Link href={`dashboard/game/${id}/settings`}>
        <Button variant="contained">Settings</Button>
      </Link>
      <Stack>
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

"use client";

import { Role } from "@/models";
import { useGame } from "@/providers/Game";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useEffect } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";

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

  const showPlayers = liveGame.players.map((player) => {
    return (
      <Grid key={player.id}>
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

  return (
    <div>
      <Typography textAlign="center" variant="h1">
        {liveGame.title}
      </Typography>
      <Typography textAlign="center" variant="h4">
        {liveGame.info}
      </Typography>

      <Link href={`dashboard/game/${id}/settings`}>
        <Button variant="contained">Settings</Button>
      </Link>
      <Stack>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {showPlayers}
        </Grid>
      </Stack>
    </div>
  );
};

export default GameView;

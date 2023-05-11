"use client";

import { Role } from "@/models";
import { useGame } from "@/providers/Game";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useEffect } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import { useDataStore } from "@/providers/User";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  const { user } = useDataStore();
  const { liveGame, setGameId } = useGame();

  useEffect(() => {
    setGameId(id);
  }, [id, setGameId]);

  if (!liveGame) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const adminIds: string[] = [liveGame.ownerId];

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
    <Box sx={{ marginBottom: "56px" }}>
      <Typography textAlign="center" variant="h1">
        {liveGame.title}
      </Typography>
      <Typography textAlign="center" variant="h4">
        {liveGame.info}
      </Typography>

      {/* {liveGame.ownerId === user?.id && (
        <Link href={`dashboard/game/${id}/settings`}>
          <Button variant="contained">Settings</Button>
        </Link>
      )} */}
      <Stack>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {showPlayers}
        </Grid>
      </Stack>
    </Box>
  );
};

export default GameView;

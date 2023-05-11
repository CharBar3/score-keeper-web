"use client";

import { Role } from "@/models";
import { useGame } from "@/providers/Game";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useEffect } from "react";
import GameNav from "../GameNav/GameNav";
import PlayerCard from "../PlayerCard/PlayerCard";
import { useDataStore } from "@/providers/User";

interface GameViewProps {
  id: string;
}

const GameView: FC<GameViewProps> = ({ id }) => {
  const { liveGame, setGameId, playerRole } = useGame();
  const { user } = useDataStore();

  useEffect(() => {
    setGameId(id);
  }, [id, setGameId]);

  if (!liveGame) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const showPlayers = liveGame.players.map((player) => {
    let hasPermission = false;

    if (playerRole === Role.Admin || playerRole === Role.Owner) {
      hasPermission = true;
    } else if (playerRole === Role.Edit && user && user.id === player.id) {
      hasPermission = true;
    }

    return (
      <Grid key={player.id}>
        <PlayerCard
          key={player.id}
          id={player.id}
          name={player.name}
          score={player.score}
          notes={player.notes}
          color={player.color}
          hasPermission={hasPermission}
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
      <GameNav gameId={id} />
    </Box>
  );
};

export default GameView;

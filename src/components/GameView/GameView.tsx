"use client";

import { Role } from "@/models";
import { useGame } from "@/providers/Game";
import {
  Box,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useEffect } from "react";
import { useDataStore } from "@/providers/User";
import PlayerCard from "../PlayerCard/PlayerCard";

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
    return (
      <>
        <Collapse in={!liveGame}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "32px",
            }}
          >
            <Typography>Loading</Typography>
            <CircularProgress size={"24px"} sx={{ marginLeft: 1 }} />
          </Box>
        </Collapse>
      </>
    );
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
    </Box>
  );
};

export default GameView;

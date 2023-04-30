import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import GameInfoForm from "../GameInfoForm/GameInfoForm";
import { useGame } from "@/providers/Game";

interface GameSettingsViewProps {
  gameId: string;
}

const GameSettingsView: FC<GameSettingsViewProps> = ({ gameId }) => {
  const { setGameId, liveGame } = useGame();

  useEffect(() => {
    setGameId(gameId);
  }, [gameId, setGameId]);

  const updateGame = () => {};

  return (
    <Stack>
      <Typography variant="h1">Game Settings</Typography>
      {!liveGame ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <GameInfoForm
          gameTitle={liveGame.title}
          gameInfo={liveGame.info}
          gamePlayers={liveGame.players}
          gamePlayerIds={liveGame.playerIds}
          gameColor={liveGame.color}
        />
      )}
    </Stack>
  );
};

export default GameSettingsView;

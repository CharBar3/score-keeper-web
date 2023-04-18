"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography variant="h3">{player.name}</Typography>
      <Typography variant="h4">Current Score: {player.score}</Typography>
      <Typography variant="body1">{player.notes}</Typography>
      <Box>
        <TextField
          id="outlined-number"
          label="Number"
          defaultValue={player.score}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <ButtonGroup>
          <Button>Increase</Button>
          <Button>Decrease</Button>
        </ButtonGroup>
      </Box>
      <TextField
        id="outlined-textarea"
        label="Multiline Placeholder"
        placeholder="Notes"
        defaultValue={player.notes}
        multiline
        rows={4}
      />
    </Stack>
  );
};

export default PlayerCard;

"use client";

import { Stack, TextField } from "@mui/material";
import { FC } from "react";

interface CreateGameFormProps {}

const CreateGameForm: FC<CreateGameFormProps> = () => {
  return (
    <Stack spacing={1}>
      <TextField
        id="outlined-basic"
        label="Title"
        name="Title"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Info"
        name="Info"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="NumberOfPlayers"
        name="NumberOfPlayers"
        variant="outlined"
      />
    </Stack>
  );
};

export default CreateGameForm;

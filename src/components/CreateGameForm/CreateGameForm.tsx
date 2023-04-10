"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { useToast } from "@/providers/ToastProvider";
import { DatabaseService } from "@/services/database-service";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

interface CreateGameFormProps {}

const CreateGameForm: FC<CreateGameFormProps> = () => {
  const { user } = UserAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const handleCreateGame = async () => {
    if (!user) {
      return;
    }

    const gameInfo = {
      title: title,
      info: info,
    };

    try {
      DatabaseService.createUserGame(user.uid, gameInfo);
      showToast("Game succesfully created!", "success");
    } catch (error) {
      showToast("Failed to create game!", "error");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "Title") {
      setTitle(e.target.value);
    } else if (e.target.name === "Info") {
      setInfo(e.target.value);
    }
  };

  return (
    <Stack
      sx={{
        maxWidth: { xs: "300px", sm: "300px", md: "500px", lg: "700px" },
        width: "100%",
        margin: "auto",
      }}
      spacing={1}
    >
      <Typography variant="h1">New Game</Typography>
      <TextField
        id="outlined-basic"
        label="Title"
        name="Title"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Info"
        name="Info"
        variant="outlined"
        onChange={(e) => handleChange(e)}
      />

      <Button variant="contained" onClick={() => handleCreateGame()}>
        Create Game
      </Button>
    </Stack>
  );
};

export default CreateGameForm;

"use client";

import { useAuth } from "@/providers/Auth";
import { useDataStore } from "@/providers/User";
import { useToast } from "@/providers/ToastProvider";
import { DatabaseService } from "@/services/database-service";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import AddPlayerModal from "../AddPlayerModal/AddPlayerModal";
import NewGamePlayerModal from "../NewGamePlayerModal/NewGamePlayerModal";
import { Color, PlayerAddParams } from "@/models";
import ColorDialog from "../ColorDialog/ColorDialog";

interface CreateGameFormProps {}

const CreateGameForm: FC<CreateGameFormProps> = () => {
  const { generateRandomColor } = useDataStore();

  const { fireUser: user } = useAuth();
  const { createGame } = useDataStore();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [players, setPlayers] = useState<PlayerAddParams[]>([]);
  const [playerIds, setPlayerIds] = useState<string[]>([]);
  const [color, setColor] = useState<Color>(generateRandomColor());

  const handleCreateGame = async () => {
    if (!user) {
      return;
    }

    try {
      await createGame(title, info, players, playerIds, color);
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

  const handleRemovePlayer = (id: string) => {
    setPlayers((prevState) => {
      const newState = [];

      for (const player of prevState) {
        if (player.id != id) {
          newState.push(player);
        }
      }

      return newState;
    });
  };

  const showPlayers = players.map(({ id, name, role }, index) => {
    return (
      // <div key={index}>
      //   <h1>{name}</h1>
      // </div>

      <Fragment key={id}>
        <ListItem>
          <ListItemText primary={name} />
          <Typography>{role}</Typography>
          <Button variant="contained">Pick Role</Button>
          <Button variant="contained" onClick={() => handleRemovePlayer(id)}>
            Remove
          </Button>
        </ListItem>
        <Divider />
      </Fragment>
    );
  });

  return (
    <Stack spacing={1}>
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

      {/* <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          setguestPayers((prevState) => {
            const newState = [...prevState, e.currentTarget.name.value];
            return newState;
          });
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-basic"
            label="Guest Player Name"
            name="name"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Add Guest Player
          </Button>
        </Box>
      </form> */}
      <NewGamePlayerModal
        setPlayers={setPlayers}
        setPlayerIds={setPlayerIds}
        playerIds={playerIds}
      />
      <List>{showPlayers}</List>

      <ColorDialog color={color} setColor={setColor} />
      <Button variant="contained" onClick={() => handleCreateGame()}>
        Create Game
      </Button>
    </Stack>
  );
};

export default CreateGameForm;

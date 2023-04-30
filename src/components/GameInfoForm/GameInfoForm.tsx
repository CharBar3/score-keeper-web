"use client";

import { Color, Player, Role } from "@/models";
import { useAuth } from "@/providers/Auth";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import ColorDialog from "../ColorDialog/ColorDialog";
import NewGamePlayerModal from "../NewGamePlayerModal/NewGamePlayerModal";
import { useGame } from "@/providers/Game";

interface GameInfoFormProps {
  gameTitle?: string;
  gameInfo?: string;
  gamePlayers?: Player[];
  gamePlayerIds?: string[];
  gameColor: Color;
}

const GameInfoForm: FC<GameInfoFormProps> = ({
  gameTitle = "",
  gameInfo = "",
  gamePlayers = [],
  gamePlayerIds = [],
  gameColor,
}) => {
  const { user, createGame } = useDataStore();
  const { liveGame, updateGame, deleteGame } = useGame();

  const { showToast } = useToast();

  const [title, setTitle] = useState(gameTitle);
  const [info, setInfo] = useState(gameInfo);
  const [players, setPlayers] = useState(gamePlayers);
  const [playerIds, setPlayerIds] = useState(gamePlayerIds);
  const [color, setColor] = useState<Color>(gameColor);

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

  const handleUpdateGame = async () => {
    if (!user || !liveGame) {
      return;
    }

    try {
      await updateGame(liveGame.id, title, info, players, playerIds, color);
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

    setPlayerIds((prevState) => {
      const newState = [];

      for (const playerId of prevState) {
        if (playerId != id) {
          newState.push(playerId);
        }
      }
      return newState;
    });
  };

  const handlePickRole = (e: SelectChangeEvent, id: string) => {
    setPlayers((prevState) => {
      const newState = [];

      for (const player of prevState) {
        if (player.id == id) {
          player.role = e.target.value as Role;
        }
        newState.push(player);
      }

      return newState;
    });
  };

  let showPlayers = players.map(({ id, name, role, color }, index) => {
    const setPlayerColor = (newColor: Color) => {
      setPlayers((prevState) => {
        const newState: any = [];

        for (const player of prevState) {
          if (player.id == id) {
            player.color = newColor;
          }
          newState.push(player);
        }

        return newState;
      });
    };

    return (
      <Fragment key={id}>
        <ListItem>
          <ListItemText primary={name} />
          <ColorDialog color={color} setColor={setPlayerColor} />
          <Box sx={{ minWidth: 120 }}>
            {role != Role.Guest && role != Role.Owner ? (
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={(e) => handlePickRole(e, id)}
                >
                  <MenuItem value={Role.Admin}>Admin</MenuItem>
                  <MenuItem value={Role.Edit}>Edit</MenuItem>
                  <MenuItem value={Role.View}>View</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <Typography>{role}</Typography>
            )}
          </Box>
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
      <TextField
        id="outlined-basic"
        label="Title"
        name="Title"
        variant="outlined"
        defaultValue={title}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Info"
        name="Info"
        variant="outlined"
        defaultValue={info}
        onChange={(e) => handleChange(e)}
      />
      <NewGamePlayerModal
        setPlayers={setPlayers}
        setPlayerIds={setPlayerIds}
        playerIds={playerIds}
      />
      <List>{showPlayers}</List>

      <ColorDialog color={color} setColor={setColor} />

      {liveGame ? (
        <>
          <Button variant="contained" onClick={() => handleUpdateGame()}>
            Save Changes
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => deleteGame(liveGame.id)}
          >
            Delete Game
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={() => handleCreateGame()}>
          Create Game
        </Button>
      )}
    </Stack>
  );
};

export default GameInfoForm;

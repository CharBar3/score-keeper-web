"use client";

import { Color, Game, Role } from "@/models";
import { useGame } from "@/providers/Game";
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
import * as _ from "lodash";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, Fragment, useState } from "react";
import ColorDialog from "../ColorDialog/ColorDialog";
import NewGamePlayerModal from "../NewGamePlayerModal/NewGamePlayerModal";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";

interface GameInfoFormProps {
  game?: Game;
}

const GameInfoForm: FC<GameInfoFormProps> = ({ game }) => {
  const { user, createGame } = useDataStore();
  const { liveGame, updateGame, deleteGame, setGameId } = useGame();
  const { generateRandomColor } = useDataStore();
  const { showToast } = useToast();
  const router = useRouter();

  const [title, setTitle] = useState(game?.title ?? "");
  const [info, setInfo] = useState(game?.info ?? "");
  const [players, setPlayers] = useState(_.cloneDeep(game?.players) ?? []);
  const [playerIds, setPlayerIds] = useState(
    _.cloneDeep(game?.playerIds) ?? []
  );
  const [color, setColor] = useState<Color>(
    _.cloneDeep(game?.color) ?? generateRandomColor()
  );

  const handleCreateGame = async () => {
    if (!user) {
      return;
    }

    try {
      const newGameId = await createGame(
        title,
        info,
        players,
        playerIds,
        color
      );
      showToast("Game succesfully created!", "success");
      router.push(`/dashboard/game/${newGameId}`);
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
      showToast("Game succesfully updated!", "success");
      router.push(`/dashboard/game/${liveGame.id}`);
    } catch (error) {
      showToast("Failed to updated game!", "error");
    }
  };

  const handleDeleteGame = async () => {
    if (!liveGame) {
      return;
    }

    try {
      await deleteGame(liveGame.id);
      showToast("Game succesfully deleted!", "success");
      router.push("/dashboard");
    } catch (error) {
      showToast("Failed to delete game!", "error");
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
      const newState: string[] = [];

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
        <ListItem sx={{ display: "flex", flexWrap: "wrap" }}>
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary={name}
            sx={{ minWidth: "320px" }}
          />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ColorDialog color={color} setColor={setPlayerColor} />
            </Box>
            <Box sx={{ minWidth: 100, marginLeft: 2, marginRight: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  variant="outlined"
                  sx={{ border: "none" }}
                  onChange={(e) => handlePickRole(e, id)}
                  disabled={role == Role.Owner ? true : false}
                >
                  {role == Role.Owner && (
                    <MenuItem value={Role.Owner}>Owner</MenuItem>
                  )}
                  <MenuItem value={Role.Admin}>Admin</MenuItem>
                  <MenuItem value={Role.Edit}>Edit</MenuItem>
                  <MenuItem value={Role.View}>View</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="styled"
                sx={{
                  width: "36px",
                  height: "36px",
                  minWidth: "unset",
                  padding: "6px",
                  margin: "auto",
                }}
                onClick={() => handleRemovePlayer(id)}
              >
                <MinusIcon height="100%" />
              </Button>
            </Box>
          </Box>
        </ListItem>

        <Divider />
      </Fragment>
    );
  });

  return (
    <Stack spacing={1} sx={{ minWidth: "unset" }}>
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

      <ColorDialog color={color} setColor={setColor} title="Game Color" />
      {/* <GameIconSelector /> */}

      {liveGame ? (
        <>
          <Button variant="contained" onClick={() => handleUpdateGame()}>
            Save Changes
          </Button>
          {/* <Link href={`/dashboard/game/${liveGame.id}`}> */}
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/dashboard/game/${liveGame.id}`);
            }}
          >
            Cancel
          </Button>
          {/* </Link> */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => handleDeleteGame()}
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

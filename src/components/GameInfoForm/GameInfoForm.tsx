"use client";

import { Color, Game, Player, Role, User } from "@/models";
import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import * as _ from "lodash";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, Fragment, useState } from "react";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import ColorDialog from "../ColorDialog/ColorDialog";
import NewGamePlayerModal from "../NewGamePlayerModal/NewGamePlayerModal";
import InputBar from "../InputBar/InputBar";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

interface GameInfoFormProps {
  game?: Game;
  user: User;
}

const GameInfoForm: FC<GameInfoFormProps> = ({ game, user }) => {
  const { updateGame, deleteGame, createGame } = useGame();
  const { generateRandomColor } = useDataStore();
  const { showToast } = useToast();
  const router = useRouter();
  const theme = useTheme();

  const [title, setTitle] = useState(game?.title ?? "");
  const [info, setInfo] = useState(game?.info ?? "");
  const [players, setPlayers] = useState<Player[]>(
    _.cloneDeep(game?.players) ?? [
      {
        id: user.id,
        name: user.username,
        role: Role.Owner,
        notes: "",
        score: 0,
        color: generateRandomColor(),
      },
    ]
  );
  const [playerIds, setPlayerIds] = useState<string[]>(
    _.cloneDeep(game?.playerIds) ?? [user.id]
  );
  const [color, setColor] = useState<Color>(
    _.cloneDeep(game?.color) ?? generateRandomColor()
  );

  const handleCreateGame = async () => {
    if (!user) {
      return;
    }

    console.log(title);
    if (title == "") {
      showToast("Please provide a title for the game", "info");
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
    if (!game) {
      return;
    }

    try {
      await updateGame(game.id, title, info, players, playerIds, color);
      showToast("Game succesfully updated!", "success");
      router.push(`/dashboard/game/${game.id}`);
    } catch (error) {
      showToast("Failed to updated game!", "error");
    }
  };

  const handleDeleteGame = async () => {
    if (!game) {
      return;
    }

    try {
      await deleteGame(game.id);
      router.push("/dashboard");
      showToast("Game succesfully deleted!", "success");
    } catch (error) {
      showToast("Failed to delete game!", "error");
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

    showToast("Removed player", "success");
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
            primary={name}
            primaryTypographyProps={{ noWrap: true }}
            sx={{ minWidth: "100px" }}
          />
          <Box sx={{ display: "flex" }}>
            <ColorDialog color={color} setColor={setPlayerColor} />
            <FormControl sx={{ unset: "all" }}>
              <Select
                value={role}
                sx={{
                  marginLeft: 1,
                  marginRight: 1,
                  border: "none",
                  color: "white",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  height: "36px",
                  width: "100px",
                  backgroundColor: theme.palette.primary.main,
                  marginBottom: "6px",
                  boxShadow: `0px 6px ${theme.palette.primary.dark}`,
                  "&:hover": { border: "red" },
                  "& .MuiSvgIcon-root":
                    role === Role.Owner || role === Role.Guest
                      ? {}
                      : { color: "white" },
                }}
                onChange={(e) => handlePickRole(e, id)}
                disabled={
                  role == Role.Owner || role == Role.Guest ? true : false
                }
              >
                {role == Role.Owner && (
                  <MenuItem value={Role.Owner}>Owner</MenuItem>
                )}
                {role == Role.Guest && (
                  <MenuItem value={Role.Guest}>Guest</MenuItem>
                )}

                <MenuItem value={Role.Admin}>Admin</MenuItem>
                <MenuItem value={Role.Edit}>Edit</MenuItem>
                <MenuItem value={Role.View}>View</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ minWidth: "36px" }}>
              {role != Role.Owner && (
                <Button
                  variant="dark"
                  sx={{
                    minWidth: "unset",
                    width: "36px",
                    height: "36px",
                    padding: "8px",
                  }}
                  onClick={() => handleRemovePlayer(id)}
                >
                  <MinusIcon height="100%" />
                </Button>
              )}
            </Box>
          </Box>
        </ListItem>

        <Divider />
      </Fragment>
    );
  });

  return (
    <Stack spacing={2} sx={{ minWidth: "unset" }}>
      <InputBar
        placeholder="Title"
        setInputValue={setTitle}
        defaultValue={title}
      />
      <InputBar
        placeholder="Info"
        setInputValue={setInfo}
        defaultValue={info}
      />
      <NewGamePlayerModal
        setPlayers={setPlayers}
        setPlayerIds={setPlayerIds}
        playerIds={playerIds}
      />
      <List>{showPlayers}</List>

      <ColorDialog color={color} setColor={setColor} title="Game Color" />
      {/* <GameIconSelector /> */}

      {game ? (
        <>
          <Button variant="dark" onClick={() => handleUpdateGame()}>
            Save Changes
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              router.push(`/dashboard/game/${game.id}`);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => handleDeleteGame()}
          >
            Delete Game
          </Button>
        </>
      ) : (
        <>
          <Button variant="dark" onClick={() => handleCreateGame()}>
            Create Game
          </Button>
          <Link href="/dashboard">
            <Button
              variant="dark"
              sx={{ width: "100%", boxShadow: "none", backgroundColor: "red" }}
            >
              Cancel
            </Button>
          </Link>
        </>
      )}
    </Stack>
  );
};

export default GameInfoForm;

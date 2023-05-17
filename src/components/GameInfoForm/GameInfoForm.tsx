"use client";

import { Color, Game, Player, Role, User } from "@/models";
import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import {
  Box,
  Button,
  FormControl,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as _ from "lodash";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import ColorDialog from "../ColorDialog/ColorDialog";
import InputBar from "../InputBar/InputBar";
import NewGamePlayerModal from "../NewGamePlayerModal/NewGamePlayerModal";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface GameInfoFormProps {
  game?: Game;
  user: User;
}

const GameInfoForm: FC<GameInfoFormProps> = ({ game, user }) => {
  const { updateGame, deleteGame, createGame, playerRole } = useGame();
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

  const handlePickRole = (e: SelectChangeEvent, id: string) => {
    setPlayers((prevState) => {
      const newState: Player[] = [];

      for (const player of prevState) {
        if (player.id == id) {
          player.role = e.target.value as Role;
        }
        newState.push(player);
      }

      return newState;
    });
  };

  let showPlayers = players.map(({ id, name, role, color }) => {
    if (playerRole != Role.Owner && playerRole != Role.Admin) {
      if (playerRole === Role.Edit && user.id != id) {
        return;
      }
    }

    const setPlayerColor = (newColor: Color) => {
      setPlayers((prevState) => {
        const newState: Player[] = [];

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
      <Box key={id} sx={{ display: "flex", padding: "0px 0px 8px 0px" }}>
        <Box
          sx={{
            flexGrow: 1,
            paddingLeft: 1,
            display: "flex",
            alignItems: "center",
            background: theme.palette.background.default,
            borderRadius: "7px",
            color: theme.palette.primary.main,
          }}
        >
          {/* <ColorDialog
            color={color}
            setColor={setPlayerColor}
            title={name}
            sx={{ height: "23px", justifyContent: "flex-start" }}
          /> */}
          <Typography sx={{ fontSize: "16px" }}>{name}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 0 }}>
          <FormControl
            sx={{
              unset: "all",
              margin: "0px 8px",
              "& .Mui-disabled": {
                backgroundColor: "#EDEDED",
                width: "56px",
                height: "40px",
                boxShadow: "none",
                display: "flex",
                justifyContent: "center",
                border: "none",
              },
            }}
          >
            <Select
              value={role}
              sx={{
                border: "none",
                color: "white",
                borderRadius: "7px",
                width: "56px",
                height: "32px",
                backgroundColor: theme.palette.primary.main,
                marginBottom:
                  role === Role.Owner ||
                  role === Role.Guest ||
                  playerRole == Role.Edit
                    ? ""
                    : "8px",
                boxShadow: `0px 8px ${theme.palette.primary.dark}`,
                fontSize: "12px",

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  padding: "0px !important",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
              disabled={
                role === Role.Owner ||
                role === Role.Guest ||
                playerRole == Role.Edit
                  ? true
                  : false
              }
              inputProps={{ IconComponent: () => null }}
              onChange={(e) => handlePickRole(e, id)}
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
          <ColorDialog color={color} setColor={setPlayerColor} />
        </Box>
      </Box>
    );
  });

  return (
    <Stack spacing={1} sx={{ minWidth: "unset" }}>
      {playerRole === Role.Owner && (
        <>
          <InputBar
            placeholder="Title"
            setInputValue={setTitle}
            value={title}
          />
          <InputBar placeholder="Info" setInputValue={setInfo} value={info} />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <NewGamePlayerModal
                setPlayers={setPlayers}
                players={players}
                setPlayerIds={setPlayerIds}
                playerIds={playerIds}
              />
            </Box>
            <Box sx={{ paddingLeft: 1, width: "104px" }}>
              <ColorDialog
                color={color}
                setColor={setColor}
                title="Game Color"
                sx={{
                  fontSize: "12px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  minHeight: "32px",
                  height: "32px",
                }}
              />
            </Box>
          </Box>
        </>
      )}
      <List sx={{ padding: 0 }}>{showPlayers}</List>

      {/* <GameIconSelector /> */}
      {game ? (
        <Box sx={{ display: "flex" }}>
          {playerRole === Role.Owner && (
            <ConfirmationDialog
              sx={{ width: "0px", flexGrow: 1, marginRight: 2 }}
              actionFunction={() => handleDeleteGame()}
            >
              <Button
                variant="red"
                // onClick={() => handleDeleteGame()}
                sx={{ width: "100%" }}
              >
                Delete
              </Button>
            </ConfirmationDialog>
          )}
          <Button
            variant="dark"
            onClick={() => {
              router.push(`/dashboard/game/${game.id}`);
            }}
            sx={{ width: "0px", flexGrow: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => handleUpdateGame()}
            sx={{ width: "0px", flexGrow: 1 }}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Button
            variant="dark"
            onClick={() => router.push("/dashboard")}
            sx={{ width: "50%", marginRight: 1 }}
          >
            Cancel
          </Button>

          <Button
            variant="dark"
            onClick={() => handleCreateGame()}
            sx={{ width: "50%", marginLeft: 1 }}
          >
            Create Game
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default GameInfoForm;

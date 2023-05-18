"use client";

import { Player, Role } from "@/models";
import { useToast } from "@/providers/ToastProvider";
import { useDataStore } from "@/providers/User";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { FC, FormEvent, Fragment, useState } from "react";
import uniqid from "uniqid";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import InputBar from "../InputBar/InputBar";

interface AddRemovePlayerDialogProps {
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  players: Player[];
  setPlayerIds: React.Dispatch<React.SetStateAction<string[]>>;
  playerIds: string[];
}

const AddRemovePlayerDialog: FC<AddRemovePlayerDialogProps> = ({
  setPlayers,
  players,
  setPlayerIds,
  playerIds,
}) => {
  const { friendsList, generateRandomColor } = useDataStore();
  const { showToast } = useToast();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [guestName, setGuestName] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlayer = (friendId: string, friendUsername: string) => {
    const newPlayer: Player = {
      id: friendId,
      name: friendUsername,
      role: Role.Edit,
      score: 0,
      notes: "",
      color: generateRandomColor(),
    };

    setPlayers((prevState) => {
      const newState = [...prevState, newPlayer];
      return newState;
    });

    setPlayerIds((prevState) => {
      const newState = [...prevState, friendId];
      return newState;
    });
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

  let showFriends = null;

  if (friendsList) {
    showFriends = friendsList.map(({ username, id }) => {
      let friendAlreadyInGame = false;

      if (playerIds.includes(id)) {
        friendAlreadyInGame = true;
        return;
      }
      return (
        <Fragment key={id}>
          <ListItem
            sx={{
              paddingTop: 0.5,
              paddingBottom: 0.5,
            }}
          >
            <ListItemText
              primary={username}
              sx={{
                width: "100%",
                height: "32px",
                borderRadius: "7px",
                backgroundColor: theme.palette.primary.light,
                fontSize: "16px",
                margin: 0,
                paddingLeft: 2,
                marginRight: 1,
              }}
            />
            {friendAlreadyInGame ? (
              <Button
                variant="red"
                sx={{
                  width: "40px",
                  minWidth: "40px",
                  height: "24px",
                  borderRadius: "7px",
                  padding: "4px",
                  margin: "0px 0px 8px 0px",
                }}
                onClick={() => handleRemovePlayer(id)}
              >
                <MinusIcon color="white" height="100%" />
              </Button>
            ) : (
              <Button
                variant="blue"
                sx={{
                  width: "40px",
                  minWidth: "40px",
                  height: "24px",
                  borderRadius: "7px",
                  padding: "4px",
                  margin: "0px 0px 8px 0px",
                }}
                onClick={() => handleAddPlayer(id, username)}
              >
                <PlusIcon color="white" height="100%" />
              </Button>
            )}
          </ListItem>
        </Fragment>
      );
    });
  }

  let showPlayers = null;

  if (players) {
    showPlayers = players.map(({ name, id, role }) => {
      if (role === Role.Owner) {
        return;
      }

      return (
        <Fragment key={id}>
          <ListItem
            sx={{
              paddingTop: 0.5,
              paddingBottom: 0.5,
            }}
          >
            <ListItemText
              primary={name}
              sx={{
                width: "100%",
                height: "32px",
                borderRadius: "7px",
                backgroundColor: theme.palette.primary.light,
                fontSize: "16px",
                margin: 0,
                paddingLeft: 2,
                marginRight: 1,
              }}
            />

            <Button
              variant="red"
              sx={{
                width: "40px",
                minWidth: "40px",
                height: "24px",
                borderRadius: "7px",
                padding: "4px",
                margin: "0px 0px 8px 0px",
              }}
              onClick={() => handleRemovePlayer(id)}
            >
              <MinusIcon color="white" height="100%" />
            </Button>
          </ListItem>
        </Fragment>
      );
    });
  }

  return (
    <div>
      <div>
        <Button
          variant="blue"
          sx={{ width: "100%", margin: "0px 0px 8px 0px", height: "32px" }}
          onClick={handleClickOpen}
        >
          Add / Remove
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              marginLeft: "8px",
              marginRight: "8px",
              minWidth: "304px",
            },
          }}
        >
          <DialogTitle
            textAlign="center"
            sx={{ fontSize: "24px", marginBottom: "0px" }}
          >
            Add Friends to Game
          </DialogTitle>
          <DialogContent sx={{ padding: "0px" }}>
            <List sx={{ maxHeight: "300px", overflow: "auto" }}>
              {showPlayers ? showPlayers : <>loading</>}
              {showFriends ? showFriends : <>loading</>}
            </List>
            <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();

                  if (guestName && guestName != "") {
                    const newGuestPlayer: Player = {
                      id: uniqid(),
                      name: guestName,
                      role: Role.Guest,
                      score: 0,
                      notes: "",
                      color: generateRandomColor(),
                    };
                    setPlayers((prevState) => {
                      const newState = [...prevState, newGuestPlayer];
                      return newState;
                    });
                    setGuestName("");

                    showToast("Guest player added", "success");
                  } else {
                    showToast("Please add guest name", "info");
                  }
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {/* <TextField
                    label="Add Guest"
                    name="guestName"
                    variant="outlined"
                    onChange={(e) => setGuestName(e.currentTarget.value)}
                    sx={{ minWidth: "100px", width: "100%" }}
                  /> */}
                  <InputBar
                    placeholder="Add Guest"
                    setInputValue={setGuestName}
                    value={guestName}
                    sx={{ width: "100%" }}
                  />
                  <Button
                    type="submit"
                    variant="blue"
                    sx={{
                      width: "60px",
                      minWidth: "60px",
                      height: "40px",
                      margin: "0px 0px 8px 8px",
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </Box>
              </form>
            </Box>
          </DialogContent>
          <DialogActions sx={{ padding: "16px" }}>
            <Button variant="dark" sx={{ width: "100%" }} onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AddRemovePlayerDialog;

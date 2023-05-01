"use client";

import { useDataStore } from "@/providers/User";
import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, FormEvent, Fragment, useState } from "react";
import { Player, Role } from "@/models";
import uniqid from "uniqid";

interface NewGamePlayerModalProps {
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setPlayerIds: React.Dispatch<React.SetStateAction<string[]>>;
  playerIds: string[];
}

const NewGamePlayerModal: FC<NewGamePlayerModalProps> = ({
  setPlayers,
  setPlayerIds,
  playerIds,
}) => {
  const { friendsList, generateRandomColor } = useDataStore();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  const [guestName, setGuestName] = useState<string | null>();

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

  let showFriends = null;
  if (friendsList) {
    showFriends = friendsList.map(({ username, id }) => {
      if (playerIds.includes(id)) {
        return;
      }

      return (
        <Fragment key={id}>
          <ListItem>
            <ListItemText primary={username} />
            <Button
              variant="text"
              onClick={() => handleAddPlayer(id, username)}
            >
              add to game
            </Button>
          </ListItem>
          <Divider />
        </Fragment>
      );
    });
  }

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Players
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Your Friends!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add your friends or guest players below
            </DialogContentText>
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
                  e.currentTarget.guestName.value = "";
                } else {
                  console.log("please input a guest name");
                }
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  id="outlined-basic"
                  label="Guest Player Name"
                  name="guestName"
                  variant="outlined"
                  onChange={(e) => setGuestName(e.currentTarget.value)}
                />
                <Button type="submit" variant="contained">
                  Add Guest Player
                </Button>
              </Box>
            </form>
            <List>
              <Divider key={1} />
              {showFriends ? showFriends : <>loading</>}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default NewGamePlayerModal;

"use client";

import { useDataStore } from "@/providers/User";
import { useLiveGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, Fragment, useState } from "react";

interface AddPlayerModalProps {}

const AddPlayerModal: FC<AddPlayerModalProps> = () => {
  const { friendsList } = useDataStore();
  const { liveGame, addPlayer } = useLiveGame();
  const { showToast } = useToast();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (friendId: string, friendUsername: string) => {
    try {
      await addPlayer(friendId, friendUsername);
      showToast("Friend added to game!", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to add friend :(", "error");
    }
  };

  let showFriends = null;
  if (friendsList) {
    showFriends = friendsList.map(({ username, id }) => {
      if (liveGame && liveGame.playerIds.includes(id)) {
        return;
      }

      return (
        <Fragment key={id}>
          <ListItem>
            <ListItemText primary={username} />
            <Button variant="text" onClick={() => handleClick(id, username)}>
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
          addPlayer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Your Friends!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pick the friends youd like to add below
            </DialogContentText>
            <List>
              <Divider key={1} />
              {showFriends ? showFriends : <>loading</>}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AddPlayerModal;

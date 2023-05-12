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
import InputBar from "../InputBar/InputBar";

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

    showToast("Friend Added", "success");
  };

  let showFriends = null;
  if (friendsList) {
    showFriends = friendsList.map(({ username, id }) => {
      if (playerIds.includes(id)) {
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
            <Button
              variant="blue"
              sx={{
                width: "40px",
                minWidth: "40px",
                height: "24px",
                borderRadius: "7px",
                padding: "4px",
              }}
              onClick={() => handleAddPlayer(id, username)}
            >
              <PlusIcon color="white" height="100%" />
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
          sx={{ width: "100%", margin: "0px" }}
          onClick={handleClickOpen}
        >
          Add Friends
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
          <DialogTitle textAlign="center" sx={{ fontSize: "24px" }}>
            Add Friends to Game
          </DialogTitle>
          <DialogContent sx={{ padding: "0px" }}>
            <List>{showFriends ? showFriends : <>loading</>}</List>
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
                    defaultValue={guestName}
                  />
                  <Button
                    type="submit"
                    variant="blue"
                    sx={{
                      width: "60px",
                      minWidth: "60px",
                      height: "40px",
                      marginLeft: 1,
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

export default NewGamePlayerModal;

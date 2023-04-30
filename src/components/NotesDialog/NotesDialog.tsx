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
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { Color } from "@/models";
import { theme } from "@/config/theme";

interface NotesDialogProps {
  notes: string;
  id: string;
  // setColor:
  //   | React.Dispatch<React.SetStateAction<Color>>
  //   | ((newColor: Color) => void);
}

const NotesDialog: FC<NotesDialogProps> = ({ notes, id }) => {
  const { updateNotes } = useGame();

  const [open, setOpen] = useState(false);
  const [newNotes, setNewNotes] = useState(notes);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    try {
      console.log(newNotes);
      updateNotes(id, newNotes);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Button
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            [theme.breakpoints.up(600)]: {
              boxShadow: "0px 6px #9A9FA4",
            },
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Notes
        </Button>
        {/* <Button
          variant="customStyle"
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            [theme.breakpoints.up(600)]: {
              boxShadow: "0px 6px #9A9FA4",
            },
          }}
        >
          Notes
          <DownIcon color="#9A9FA4" height="100%" />
        </Button> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update your notes!</DialogTitle>
          <DialogContent>
            <DialogContentText gutterBottom>
              Update your notes!
            </DialogContentText>

            <Stack spacing={1}>
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"
                multiline
                defaultValue={notes}
                rows={4}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              cancel
            </Button>
            <Button variant="contained" sx={{}} onClick={handleClick}>
              update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default NotesDialog;

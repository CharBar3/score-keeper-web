"use client";

import { useGame } from "@/providers/Game";
import { Stack, SxProps, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import DownArrow from "../../../public/icons/down_arrow_icon_55px.svg";

interface NotesDialogProps {
  notes: string;
  id: string;
  sx: SxProps;
}

const NotesDialog: FC<NotesDialogProps> = ({ notes, id, sx }) => {
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
    <>
      <Button variant="styled" onClick={handleClickOpen} sx={sx}>
        Notes
        <DownArrow height="100%" />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update your notes!</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>Update your notes!</DialogContentText>

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
          <Button variant="contained" onClick={handleClick}>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotesDialog;

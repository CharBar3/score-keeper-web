"use client";

import { useGame } from "@/providers/Game";
import { Stack, SxProps, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { FC, useState } from "react";
import DownArrow from "../../../public/icons/down_arrow_icon_55px.svg";

interface NotesDialogProps {
  notes: string;
  id: string;
  sx: SxProps;
  name: string;
}

const NotesDialog: FC<NotesDialogProps> = ({ notes, id, sx, name }) => {
  const { updateNotes } = useGame();
  const theme = useTheme();

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
      updateNotes(id, newNotes);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleClickOpen} sx={sx}>
        Notes
        <DownArrow height="100%" />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">{name} Notes</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
              multiline
              defaultValue={notes}
              sx={{
                marginTop: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "4px",
                    borderStyle: "solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "7px",
                  },
                  "&:hover fieldset": {
                    borderWidth: "4px",
                    borderStyle: "solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "7px",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: "4px",
                    borderStyle: "solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "7px",
                  },
                },
              }}
              rows={4}
              onChange={(e) => setNewNotes(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="dark"
            onClick={handleClose}
            sx={{ flexGrow: 1, width: "0px", minWidth: "0px" }}
          >
            cancel
          </Button>
          <Button
            variant="blue"
            onClick={handleClick}
            sx={{ flexGrow: 1, width: "0px", minWidth: "0px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotesDialog;

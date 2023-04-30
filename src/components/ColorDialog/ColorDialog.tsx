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

interface AddPlayerModalProps {
  color: Color;
  setColor:
    | React.Dispatch<React.SetStateAction<Color>>
    | ((newColor: Color) => void);
}

const AddPlayerModal: FC<AddPlayerModalProps> = ({ color, setColor }) => {
  const updateButtonTextColor = (color: Color) => {
    // Get YIQ ratio
    var yiq = (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;

    // Check contrast

    return yiq >= 128 ? "black" : "white";
  };

  const [open, setOpen] = useState(false);

  const [newColor, setNewColor] = useState<Color>({ ...color });
  const [textColor, setTextColor] = useState<string>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedSlider = (e: Event, newValue: number | number[]) => {
    setNewColor((prevState) => {
      prevState.red = newValue as number;
      const newState = { ...prevState };
      setTextColor(updateButtonTextColor(newState));
      return newState;
    });
  };
  const handlGreenSlider = (e: Event, newValue: number | number[]) => {
    setNewColor((prevState) => {
      prevState.green = newValue as number;
      const newState = { ...prevState };
      setTextColor(updateButtonTextColor(newState));
      return newState;
    });
  };
  const handleBlueSlider = (e: Event, newValue: number | number[]) => {
    setNewColor((prevState) => {
      prevState.blue = newValue as number;
      const newState = { ...prevState };
      setTextColor(updateButtonTextColor(newState));
      return newState;
    });
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
          }}
        >
          Color
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update your game color!</DialogTitle>
          <DialogContent>
            <DialogContentText gutterBottom>
              Pick your RGB values!
            </DialogContentText>

            <Stack spacing={1}>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ marginRight: 4 }}>Red</Typography>
                <Slider
                  key={`slider-${color.red}`}
                  defaultValue={color.red}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={255}
                  onChange={handleRedSlider}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ marginRight: 2 }}>Green</Typography>
                <Slider
                  key={`slider-${color.green}`}
                  defaultValue={color.green}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={255}
                  onChange={handlGreenSlider}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ marginRight: "29px" }}>Blue</Typography>
                <Slider
                  key={`slider-${color.blue}`}
                  defaultValue={color.blue}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={255}
                  onChange={handleBlueSlider}
                />
              </Box>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                }}
              >
                <Typography>Old Color</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: `rgb(${newColor.red}, ${newColor.green}, ${newColor.blue})`,
                }}
              >
                <Typography sx={{ color: textColor }}>New Color</Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={
                {
                  // backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                }
              }
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              sx={{}}
              onClick={() => {
                setColor(newColor);
                handleClose();
              }}
            >
              update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AddPlayerModal;

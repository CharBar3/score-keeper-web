"use client";

import { Color } from "@/models";
import { Box, Slider, SxProps, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import { FC, useState } from "react";
import ColorWheelBackground from "../../../public/color_wheel.png";
import RandomIcon from "../../../public/icons/randomize_icon_game master.svg";
import { useToast } from "@/providers/ToastProvider";
import { useTheme } from "@mui/material/styles";

interface ColorDialogProps {
  color: Color;
  setColor:
    | React.Dispatch<React.SetStateAction<Color>>
    | ((newColor: Color) => void);
  title?: string;
  sx?: SxProps;
}

const ColorChoiceButton = styled(Button)(({ theme }) => ({
  minWidth: "unset",
  width: "100%",
  aspectRatio: "1/1",
}));

const ColorDialog: FC<ColorDialogProps> = ({ color, setColor, title, sx }) => {
  const { showToast } = useToast();
  const theme = useTheme();

  const colorChoices: Color[] = [
    { red: 230, green: 30, blue: 35 },
    { red: 235, green: 80, blue: 40 },
    { red: 240, green: 130, blue: 45 },
    { red: 250, green: 170, blue: 25 },
    { red: 255, green: 205, blue: 5 },
    { red: 145, green: 190, blue: 60 },
    { red: 35, green: 175, blue: 115 },
    { red: 35, green: 200, blue: 255 },
    { red: 20, green: 160, blue: 230 },
    { red: 0, green: 115, blue: 180 },
    { red: 135, green: 45, blue: 155 },
    { red: 190, green: 65, blue: 185 },
    { red: 240, green: 85, blue: 215 },
    { red: 235, green: 60, blue: 125 },
  ];

  const updateTextColor = (color: Color) => {
    // Get YIQ ratio
    var yiq = (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;

    // Check contrast

    return yiq >= 128 ? "black" : "white";
  };

  const [open, setOpen] = useState(false);

  const [newColor, setNewColor] = useState<Color>({ ...color });

  const [currentTextColor, setCurrentTextColor] = useState(
    updateTextColor(color)
  );

  const [newTextColor, setNewTextColor] = useState<string>(
    updateTextColor(color)
  );

  const [redSliderValue, setRedSliderValue] = useState(color.red);
  const [greenSliderValue, setGreenSliderValue] = useState(color.green);
  const [blueSliderValue, setblueSliderValue] = useState(color.blue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedSlider = (e: Event, newValue: number | number[]) => {
    setRedSliderValue(newValue as number);
    setNewColor((prevState) => {
      prevState.red = newValue as number;
      const newState = { ...prevState };
      setNewTextColor(updateTextColor(newState));
      return newState;
    });
  };
  const handlGreenSlider = (e: Event, newValue: number | number[]) => {
    setGreenSliderValue(newValue as number);
    setNewColor((prevState) => {
      prevState.green = newValue as number;
      const newState = { ...prevState };
      setNewTextColor(updateTextColor(newState));
      return newState;
    });
  };
  const handleBlueSlider = (e: Event, newValue: number | number[]) => {
    setblueSliderValue(newValue as number);
    setNewColor((prevState) => {
      prevState.blue = newValue as number;
      const newState = { ...prevState };
      setNewTextColor(updateTextColor(newState));
      return newState;
    });
  };

  const handleRandomButtonClick = () => {
    const randomNumber = () => {
      return Math.floor(Math.random() * 255);
    };

    const randomColor = {
      red: randomNumber(),
      green: randomNumber(),
      blue: randomNumber(),
    };

    setNewColor(randomColor);
    setRedSliderValue(randomColor.red);
    setGreenSliderValue(randomColor.green);
    setblueSliderValue(randomColor.blue);
    setNewTextColor(updateTextColor(randomColor));
  };

  const showColorChoices = colorChoices.map(({ red, green, blue }, index) => {
    return (
      <Grid key={`${red}${green}${blue}`} xs={3}>
        <ColorChoiceButton
          sx={{
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
            boxShadow: `0px 8px rgb(${red * 0.8}, ${green * 0.8}, ${
              blue * 0.8
            })`,
            "@media (hover: hover)": {
              "&:hover": {
                backgroundColor: `rgb(${red * 0.9}, ${green * 0.9}, ${
                  blue * 0.9
                })`,
              },
            },
          }}
          onClick={() => {
            const selectedColor = colorChoices[index];
            setNewColor(selectedColor);
            setRedSliderValue(selectedColor.red);
            setGreenSliderValue(selectedColor.green);
            setblueSliderValue(selectedColor.blue);
            setNewTextColor(updateTextColor(selectedColor));
          }}
        ></ColorChoiceButton>
      </Grid>
    );
  });

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            ...sx,
            backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
            boxShadow: `0px 8px rgb(${color.red * 0.8}, ${color.green * 0.8}, ${
              color.blue * 0.8
            })`,
            borderRadius: "7px",
            minWidth: "unset",
            width: title ? "100%" : "40px",
            height: "32px",
            padding: "0px",
            marginBottom: "8px",

            "&:hover": {
              backgroundColor: `rgb(${color.red * 0.8}, ${color.green * 0.8}, ${
                color.blue * 0.8
              })`,
              boxShadow: `0px 8px rgb(${color.red * 0.8}, ${
                color.green * 0.8
              }, ${color.blue * 0.8})`,
            },
          }}
        >
          {title}
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "0px",
            minWidth: "300px",
            width: "320px",
          },
        }}
      >
        <DialogTitle textAlign="center">Choose Color</DialogTitle>
        <DialogContent>
          {/* <DialogContentText gutterBottom>Choose Color</DialogContentText> */}

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                width: "90px",
                height: "40px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                marginRight: 1,
              }}
            >
              <Typography sx={{ color: `${currentTextColor}` }}>
                Current
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: `rgb(${newColor.red}, ${newColor.green}, ${newColor.blue})`,
                width: "90px",
                height: "40px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                marginLeft: 1,
              }}
            >
              <Typography sx={{ color: newTextColor }}>New</Typography>
            </Box>
          </Box>
          <Grid
            container
            spacing={{ xs: 2 }}
            sx={{ marginBottom: 1, marginTop: 0.5 }}
          >
            {showColorChoices}
            <Grid xs={6}>
              <Button
                variant="blue"
                sx={{
                  width: "100%",
                  height: "56px",
                  backgroundImage: `url(${ColorWheelBackground.src})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                onClick={handleRandomButtonClick}
              >
                <RandomIcon height="100%" color="white" />
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ marginBottom: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#E51E23",
                  borderRadius: "50%",
                  display: "flex",
                  minWidth: "24px",
                  width: "24px",
                  height: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  R
                </Typography>
              </Box>
              <Slider
                key={`slider-${color.red}`}
                // defaultValue={redSlider}
                value={redSliderValue}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={255}
                onChange={handleRedSlider}
                sx={{
                  color: "#E51E23",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#23AE73",
                  borderRadius: "50%",
                  display: "flex",
                  minWidth: "24px",
                  width: "24px",
                  height: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  G
                </Typography>
              </Box>
              <Slider
                key={`slider-${color.green}`}
                value={greenSliderValue}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={255}
                onChange={handlGreenSlider}
                sx={{
                  color: "#23AE73",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#149FE5",
                  borderRadius: "50%",
                  display: "flex",
                  minWidth: "24px",
                  width: "24px",
                  height: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 2,
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  B
                </Typography>
              </Box>
              <Slider
                key={`slider-${color.blue}`}
                value={blueSliderValue}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={255}
                onChange={handleBlueSlider}
                sx={{
                  color: "#149FE5",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="dark"
              sx={{
                flexGrow: 1,
                marginRight: 1,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              sx={{
                flexGrow: 1,
              }}
              onClick={() => {
                handleClose();
                setCurrentTextColor(updateTextColor(newColor));
                setColor(newColor);
                showToast("Color applied", "success");
              }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ColorDialog;

"use client";

import { Color, Player, Role } from "@/models";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

import { useGame } from "@/providers/Game";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "@/providers/ToastProvider";
import { theme } from "@/config/theme";

import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import DownIcon from "../../../public/icons/down_arrow_icon_55px.svg";
import { useAuth } from "@/providers/Auth";
import { useDataStore } from "@/providers/User";
import NotesDialog from "../NotesDialog/NotesDialog";

interface PlayerCardProps {
  id: string; // the players id.
  name: string; // defaults to the players username but can be updated
  role: Role;
  score: number;
  notes: string;
  color: Color;
  adminIds: string[];
}

enum Action {
  Increase = "increase",
  Decrease = "decrease",
}

const PlayerCard: FC<PlayerCardProps> = ({
  id,
  name,
  role,
  score,
  notes,
  color,
  adminIds,
}) => {
  const { user } = useDataStore();
  const { liveGame, increaseScore, decreaseScore } = useGame();
  const { showToast } = useToast();

  // Security

  let roleButtonColor = "red";
  let roleDisabled = true;

  if (user && liveGame) {
    if (adminIds.includes(user.id) || user.id === liveGame.ownerId) {
      roleDisabled = false;
      roleButtonColor = "blue";
    } else if (user.id === id && role === Role.Edit) {
      roleDisabled = false;
      roleButtonColor = "blue";
    }
  }

  const [inputNumber, setInputNumber] = useState<number>(0);
  const [scoreAction, setScoreAction] = useState<Action>(Action.Increase);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (increaseOrDecrease: Action) => {
    setScoreAction(increaseOrDecrease);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputNumber(0);
  };

  const handleChangeScore = () => {
    if (inputNumber === 0) {
      showToast(`Please input number or cancel`, "error");
      return;
    }

    try {
      if (scoreAction === Action.Increase) {
        increaseScore(id, inputNumber);
        showToast(`Score Increased!`, "success");
        setInputNumber(0);
      } else if (scoreAction === Action.Decrease) {
        decreaseScore(id, inputNumber);
        showToast(`Score Decreased!`, "success");
        setInputNumber(0);
      }
      handleClose();
    } catch (error) {
      showToast(`Failed to update score!`, "error");
    }
  };

  const boxShadowColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const borderColor = `rgba(${color.red}, ${color.green}, ${color.blue}, .6)`;

  return (
    <Card
      sx={{
        borderColor: borderColor,
        borderStyle: "solid",
        borderWidth: "7px",
        borderRadius: "7px",
        boxShadow: `0px 20px ${boxShadowColor}`,
        marginBottom: "20px",
        aspectRatio: "13/14",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        [theme.breakpoints.only("sm")]: {
          borderWidth: "10px",
          boxShadow: `0px 30px ${boxShadowColor}`,
          marginBottom: "30px",
        },
        [theme.breakpoints.only("md")]: {
          borderWidth: "15px",
          boxShadow: `0px 45px ${boxShadowColor}`,
          marginBottom: "45px",
        },
        [theme.breakpoints.only("lg")]: {
          borderWidth: "10px",
          boxShadow: `0px 30px ${boxShadowColor}`,
          marginBottom: "30px",
        },
        [theme.breakpoints.only("xl")]: {
          borderWidth: "15px",
          boxShadow: `0px 45x ${boxShadowColor}`,
          marginBottom: "45px",
        },
      }}
    >
      <CardContent
        sx={{
          height: "70%",
          [theme.breakpoints.down(450)]: {
            paddingBottom: "10px",
            paddingTop: "10px",
          },
          [theme.breakpoints.down(350)]: {
            paddingTop: "5px",
            paddingBottom: "0px",
          },
        }}
      >
        <Typography
          variant="h4"
          // color="text.secondary"
          textAlign="center"
          noWrap
          gutterBottom
          sx={{
            [theme.breakpoints.down(450)]: {
              fontSize: "15px",
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            // [theme.breakpoints.down(450)]: {
            //   fontSize: "20px",
            // },
            [theme.breakpoints.down(350)]: {
              fontSize: "25px",
            },
          }}
        >
          {score}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          height: "15%",
        }}
      >
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
        <NotesDialog notes={notes} id={id} />
      </CardActions>

      <CardActions sx={{ height: "15%", marginBottom: "4px" }}>
        <Button
          variant="customStyle"
          disabled={roleDisabled}
          sx={{
            height: "100%",
            backgroundColor: roleButtonColor,
            [theme.breakpoints.up(600)]: {
              boxShadow: "0px 6px #9A9FA4",
            },
          }}
          onClick={() => handleOpen(Action.Decrease)}
        >
          <MinusIcon color="#9A9FA4" width="100%" height="100%" />
        </Button>
        <Button
          variant="customStyle"
          disabled={roleDisabled}
          sx={{
            backgroundColor: roleButtonColor,
            height: "100%",
            [theme.breakpoints.up(600)]: {
              boxShadow: "0px 6px #9A9FA4",
            },
          }}
          onClick={() => handleOpen(Action.Increase)}
        >
          <PlusIcon color="#9A9FA4" width="100%" height="100%" />
        </Button>
      </CardActions>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Change the score!</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>change your score below</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="score"
            label={`${scoreAction} score`}
            type="number"
            variant="outlined"
            onChange={(e) => setInputNumber(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="customStyle"
            sx={{ height: "30px", width: "50px" }}
            onClick={handleChangeScore}
          >
            Cancel
          </Button>
          <Button
            variant="customStyle"
            sx={{ height: "30px", width: "50px" }}
            onClick={handleChangeScore}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PlayerCard;

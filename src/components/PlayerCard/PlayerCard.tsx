"use client";

import { Player } from "@/models";
import {
  Button,
  Card,
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

interface PlayerCardProps {
  player: Player;
}

enum Action {
  Increase = "increase",
  Decrease = "decrease",
}

const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  const { increaseScore, decreaseScore } = useGame();
  const { showToast } = useToast();

  const [inputNumber, setInputNumber] = useState<number>(0);
  const [scoreAction, setScoreAction] = useState<Action>(Action.Increase);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (increaseOrDecrease: Action) => {
    setScoreAction(increaseOrDecrease);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeScore = () => {
    console.log("score action " + scoreAction);
    try {
      if (scoreAction === Action.Increase) {
        increaseScore(player.id, inputNumber);
        showToast(`Score Increased!`, "success");
      } else if (scoreAction === Action.Decrease) {
        decreaseScore(player.id, inputNumber);
        showToast(`Score Decreased!`, "success");
      }
      handleClose();
    } catch (error) {
      showToast(`Failed to update score!`, "error");
    }
  };

  return (
    <Card variant="playerCard">
      <CardContent>
        <Typography
          sx={{
            fontSize: "20pt",
            width: "100%",
          }}
          align="left"
          // color="text.secondary"
          gutterBottom
        >
          {player.name}
        </Typography>
        <Typography>{player.score}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => handleOpen(Action.Decrease)}>
          -
        </Button>
        <Button variant="outlined" onClick={() => handleOpen(Action.Increase)}>
          +
        </Button>
      </CardActions>
      <div>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Change the score!</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>change your score below</DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="score"
              label="score"
              type="number"
              // fullWidth
              variant="outlined"
              onChange={(e) => setInputNumber(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChangeScore}>Cancel</Button>
            <Button onClick={handleChangeScore}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Card>
  );
};

export default PlayerCard;

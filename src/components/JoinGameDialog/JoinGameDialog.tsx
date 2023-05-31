import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, useState } from "react";
import InputBar from "../InputBar/InputBar";
import { useGame } from "@/providers/Game";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";

interface JoinGameDialogProps {}

const JoinGameDialog: FC<JoinGameDialogProps> = () => {
  const { joinGame } = useGame();
  const { showToast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoin = async () => {
    try {
      const gameId = await joinGame(joinCode);
      router.push(`/dashboard/game/${gameId}`);
      showToast("Joined Game!", "success");
    } catch (error) {
      showToast("Failed to join game", "error");
      console.log(error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button variant="dark" sx={{ width: "100%" }} onClick={handleClickOpen}>
        Join Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Join Code</DialogTitle>
        <DialogContent>
          <InputBar
            value={joinCode}
            setInputValue={setJoinCode}
            placeholder="Join Code"
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex" }}>
          <Button variant="dark" onClick={handleClose} sx={{ width: "100%" }}>
            Cancel
          </Button>
          <Button variant="blue" onClick={handleJoin} sx={{ width: "100%" }}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinGameDialog;

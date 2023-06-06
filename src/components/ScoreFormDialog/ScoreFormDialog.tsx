"use client";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  InputBaseProps,
  SxProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Unstable_Grid2";
import { FC, useState } from "react";

import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";

interface ScoreFormDialogProps {
  playerId: string;
  sx?: SxProps;
}

const StyledInputBase = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  // display: "flex",
  borderWidth: "4px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "7px",
  height: "48px",
  color: theme.palette.primary.main,
  fontSize: "36px",
  minWidth: "unset",
  width: "100%",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  "& .MuiInputBase-input": {
    textAlign: "center",
  },
}));

const StyledSmallButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: "48px",
  height: "32px",
  color: "white",
  borderRadius: "7px",
  margin: 0,
  textTransform: "initial",
  fontSize: "20px",
  minWidth: "48px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "@media (hover: hover)": {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledBigButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: "112px",
  height: "32px",
  color: "white",
  borderRadius: "7px",
  margin: 0,
  textTransform: "initial",
  fontSize: "20px",
  minWidth: "48px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "@media (hover: hover)": {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledActionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: "112px",
  height: "40px",
  color: "white",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0px 8px ${theme.palette.primary.dark}`,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: "7px",
  textTransform: "initial",
  fontSize: "20px",
  minWidth: "48px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "@media (hover: hover)": {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ScoreFormDialog: FC<ScoreFormDialogProps> = ({ playerId, sx }) => {
  const { updateScore } = useGame();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [scoreInputValue, setScoreInputValue] = useState<string>("0");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setScoreInputValue("0");
  };

  const handleUpdateNumber = (number: number) => {
    setScoreInputValue((prevState) => {
      const newState = parseInt(prevState) + number;
      return newState.toString();
    });
  };

  const handleApply = () => {
    const regex: RegExp = /^(-?[0-9]+)$/;

    if (!regex.test(scoreInputValue)) {
      showToast("Please only positive or negative numbers 0-9 and", "info");
      setScoreInputValue("0");
      return;
    }

    updateScore(playerId, parseInt(scoreInputValue));
    handleClose();
  };

  return (
    <>
      <Button
        variant="dark"
        sx={{ ...sx, margin: "0px 0px 8px 0px" }}
        onClick={handleClickOpen}
      >
        + / -
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "0px",
            minWidth: "272px",
            width: "272px",
          },
        }}
      >
        <DialogTitle textAlign="center" sx={{ fontSize: "24px" }}>
          Edit Score
        </DialogTitle>
        <DialogContent sx={{ padding: "0px 16px 16px 16px" }}>
          <StyledInputBase
            value={scoreInputValue}
            onChange={(e) => setScoreInputValue(e.currentTarget.value)}
          />
          <Grid container spacing={2}>
            <Grid xs={6}>
              <StyledBigButton variant="red"> -1</StyledBigButton>
            </Grid>
            <Grid xs={6}>
              <StyledBigButton
                variant="blue"
                onClick={() => handleUpdateNumber(1)}
              >
                +1
              </StyledBigButton>
            </Grid>

            <Grid xs={3}>
              <StyledSmallButton
                variant="red"
                onClick={() => handleUpdateNumber(-2)}
              >
                -2
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="red"
                onClick={() => handleUpdateNumber(-3)}
              >
                -3
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="blue"
                onClick={() => handleUpdateNumber(2)}
              >
                +2
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="blue"
                onClick={() => handleUpdateNumber(3)}
              >
                +3
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="red"
                onClick={() => handleUpdateNumber(-5)}
              >
                -5
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="red"
                onClick={() => handleUpdateNumber(-10)}
              >
                -10
              </StyledSmallButton>
            </Grid>

            <Grid xs={3}>
              <StyledSmallButton
                variant="blue"
                onClick={() => handleUpdateNumber(5)}
              >
                +5
              </StyledSmallButton>
            </Grid>
            <Grid xs={3}>
              <StyledSmallButton
                variant="blue"
                onClick={() => handleUpdateNumber(10)}
              >
                +10
              </StyledSmallButton>
            </Grid>

            <Grid xs={6}>
              <StyledActionButton onClick={handleClose}>
                Cancel
              </StyledActionButton>
            </Grid>
            <Grid xs={6}>
              <StyledActionButton onClick={handleApply}>
                Apply
              </StyledActionButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScoreFormDialog;

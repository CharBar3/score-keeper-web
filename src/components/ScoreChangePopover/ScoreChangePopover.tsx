"use client";
import { Button, InputBase, Popover, SxProps, styled } from "@mui/material";

import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";
import { FC, useState } from "react";
import MinusIcon from "../../../public/icons/minus_icon_55px.svg";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";

enum Action {
  Increase = "increase",
  Decrease = "decrease",
}

interface ScoreChangePopoverProps {
  action: Action;
  playerId: string;
  sx?: SxProps;
  color: string;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  minWidth: "unset",
  maxWidth: "50%",
  fontSize: "22px",
  "& .MuiInputBase-input": {
    marginLeft: theme.spacing(1),
  },
}));

const ScoreChangePopover: FC<ScoreChangePopoverProps> = ({
  action,
  playerId,
  sx,
  color,
}) => {
  let buttonIcon = null;
  if (action === Action.Increase) {
    buttonIcon = <PlusIcon height="100%" />;
  } else if (action === Action.Decrease) {
    buttonIcon = <MinusIcon height="100%" />;
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null | any>(
    null
  );
  const { showToast } = useToast();
  const { increaseScore, decreaseScore } = useGame();

  const [inputStringNumber, setInputStringNumber] = useState<string | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget.parentElement?.parentElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setInputStringNumber(null);
  };

  const handleChangeScore = () => {
    const regex: RegExp = /^[0-9]\d*$/;

    if (inputStringNumber === ("" || null)) {
      showToast(`No input`, "info");
      return;
    }
    console.log(inputStringNumber);

    if (!regex.test(inputStringNumber)) {
      console.log("regex happend");
      showToast(`Please type only numbers 1 through 9`, "info");
      return;
    }

    const inputNumber = parseInt(inputStringNumber);

    if (inputNumber === 0) {
      showToast(`Please input a number greater than 0`, "info");
      return;
    }

    try {
      if (action === Action.Increase) {
        increaseScore(playerId, inputNumber);
        showToast(`Score Increased!`, "success");
      } else if (action === Action.Decrease) {
        decreaseScore(playerId, inputNumber);
        showToast(`Score Decreased!`, "success");
      }
      handleClose();
    } catch (error) {
      showToast(`Failed to update score!`, "error");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Button
        aria-describedby={id}
        variant="dark"
        onClick={handleClick}
        sx={sx}
      >
        {buttonIcon}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "10px",
            width: "290px",
            borderColor: color,
            borderStyle: "solid",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px",
            paddingBottom: "12px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <StyledInputBase
          autoFocus
          type="number"
          placeholder="Number"
          onChange={(e) => {
            setInputStringNumber(e.target.value);
          }}
        />
        <Button
          variant="dark"
          onClick={handleChangeScore}
          sx={{ width: "129px", height: "44px" }}
        >
          {buttonIcon}
        </Button>
      </Popover>
    </>
  );
};

export default ScoreChangePopover;

"use client";
import { Box, Icon, Typography, useTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";

import CardsGameIcon from "../../../public/game-icons/cards_icon_02.svg";
import CastleGameIcon from "../../../public/game-icons/castle_icon_02.svg";
import GamePeicesGameIcon from "../../../public/game-icons/game_peices_icon_02.svg";
import JewelGameIcon from "../../../public/game-icons/jewel_icon_02.svg";
import MoneySignGameIcon from "../../../public/game-icons/money_sign_icon_02.svg";
import TrainGameIcon from "../../../public/game-icons/train_icon_02.svg";
import { Color, IconNames } from "@/models";

interface GameIconSelectorProps {
  gameColor: Color;
  gameIcon: IconNames;
  setGameIcon: Dispatch<SetStateAction<IconNames>>;
}

const GameIconSelector: FC<GameIconSelectorProps> = ({
  gameColor,
  gameIcon,
  setGameIcon,
}) => {
  const theme = useTheme();

  const gameColorRGB = `rgb(${gameColor.red} ${gameColor.green} ${gameColor.blue})`;

  const [selectedIcon, setSelectedIcon] = useState<IconNames>(gameIcon);

  const handleClick = (iconName: IconNames) => {
    setGameIcon(iconName);
    setSelectedIcon(iconName);
  };

  const sxNotSelected = {
    width: "100px",
    border: `4px solid transparent`,
    padding: "10px",
    color: theme.palette.primary.main,
  };

  const sxSelected = {
    width: "100px",
    padding: "10px",
    border: `4px solid ${gameColorRGB}`,
    borderRadius: "7px",
    color: `${gameColorRGB}`,
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box
          onClick={() => {
            handleClick(IconNames.Cards);
          }}
          sx={selectedIcon === IconNames.Cards ? sxSelected : sxNotSelected}
        >
          <CardsGameIcon />
        </Box>
        <Box
          onClick={() => {
            handleClick(IconNames.Castle);
          }}
          sx={selectedIcon === IconNames.Castle ? sxSelected : sxNotSelected}
        >
          <CastleGameIcon />
        </Box>
        <Box
          onClick={() => {
            handleClick(IconNames.GamePeices);
          }}
          sx={
            selectedIcon === IconNames.GamePeices ? sxSelected : sxNotSelected
          }
        >
          <GamePeicesGameIcon />
        </Box>
        <Box
          onClick={() => {
            handleClick(IconNames.Jewel);
          }}
          sx={selectedIcon === IconNames.Jewel ? sxSelected : sxNotSelected}
        >
          <JewelGameIcon />
        </Box>
        <Box
          onClick={() => {
            handleClick(IconNames.MoneySign);
          }}
          sx={selectedIcon === IconNames.MoneySign ? sxSelected : sxNotSelected}
        >
          <MoneySignGameIcon />
        </Box>
        <Box
          onClick={() => {
            handleClick(IconNames.Train);
          }}
          sx={selectedIcon === IconNames.Train ? sxSelected : sxNotSelected}
        >
          <TrainGameIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default GameIconSelector;

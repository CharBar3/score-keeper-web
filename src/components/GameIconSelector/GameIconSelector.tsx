"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

import CardGameIcon from "../../../public/game-icons/cards_icon.svg";

interface GameIconSelectorProps {}

const GameIconSelector: FC<GameIconSelectorProps> = () => {
  return (
    <Box>
      <Typography>GameIconSelector</Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "100px", height: "100px" }}>
          <CardGameIcon color="red" />
        </Box>
        <Box sx={{ width: "100px", height: "100px" }}>
          <CardGameIcon color="red" />
        </Box>
        <Box sx={{ width: "100px", height: "100px" }}>
          <CardGameIcon color="red" />
        </Box>
        <Box sx={{ width: "100px", height: "100px" }}>
          <CardGameIcon color="red" />
        </Box>
        <Box sx={{ width: "100px", height: "100px" }}>
          <CardGameIcon color="red" />
        </Box>
      </Box>
    </Box>
  );
};

export default GameIconSelector;

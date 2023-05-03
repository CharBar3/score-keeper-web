// "use client";
import { Color } from "@/models";
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import GameIcon from "../../../public/game-icons/cards_icon.svg";
import PlayerIcon from "../../../public/icons/player_icon_55px.svg";

import { theme } from "@/config/theme";

interface GameCardProps {
  title: string;
  playerIds: string[];
  color: Color;
}

const GameCard: FC<GameCardProps> = ({ title, playerIds, color }) => {
  const gameCardRef = useRef<HTMLDivElement>(null);
  const [borderWidth, setBorderWidth] = useState<number | null>(null);
  const [shadowHeight, setShadowHeight] = useState<number | null>(null);
  const [textHeight, setTextHeight] = useState<number | null>(null);

  const boxShadowColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const borderColor = `rgba(${color.red}, ${color.green}, ${color.blue}, .7)`;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].target === gameCardRef.current) {
        setBorderWidth(entries[0].contentRect.width / 20);
        setShadowHeight(entries[0].contentRect.height / 7);
        setTextHeight(entries[0].contentRect.height);
      }
    });
    if (gameCardRef.current) {
      resizeObserver.observe(gameCardRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [gameCardRef]);

  return (
    <Box
      ref={gameCardRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderRadius: "7px",
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: `0px ${shadowHeight}px ${boxShadowColor}`,
        marginBottom: `${shadowHeight}px`,
        aspectRatio: "13/14",
      }}
    >
      <Box
        sx={{
          paddingTop: 1,
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          textAlign="center"
          // noWrap
          sx={{ fontSize: `${textHeight ? textHeight / 10 : 10}px` }}
        >
          {title}
        </Typography>
      </Box>

      <GameIcon height="60%" color={borderColor} />

      <Box sx={{ height: "10%", display: "flex" }}>
        <Typography
          sx={{
            fontSize: `${textHeight ? textHeight / 10 : 10}px`,
            paddingLeft: 1,
            paddingRight: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {playerIds.length}
        </Typography>
        <PlayerIcon height="90%" color={theme.palette.primary.main} />
      </Box>
    </Box>
  );
};

export default GameCard;

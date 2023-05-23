// "use client";
import { Color } from "@/models";
import { Box, Typography, keyframes } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import GameIcon from "../../../public/game-icons/cards_icon.svg";
import PlayerIcon from "../../../public/icons/player_icon_55px.svg";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import { theme } from "@/config/theme";

interface GameCardProps {
  title: string;
  color: Color;
  numberOfPlayers: number;
  index: number;
}

const growKeys = keyframes`
  0% {
    opacity: 0;
    width: 0%;

  }
  100% {
    opacity: 1;
    width: 100%;
  }
  `;
const flipOuterKeys = keyframes`
  0% {
    transform: scale(-1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
  `;
const flipInnerKeys = keyframes`
  0% {
    opacity: 1; 
  }
  30% {
    opacity: 1;
  }
  31% {
    opacity: 0; 
  }
  100% {
    opacity: 0;
  }
  `;

// transform: translate(0) scale(0);
// transform: translate(200px, 200px) scale(1);

const GameCard: FC<GameCardProps> = ({
  title,
  numberOfPlayers,
  color,
  index,
}) => {
  const gameCardRef = useRef<HTMLDivElement>(null);
  const [borderWidth, setBorderWidth] = useState<number | null>(null);
  const [shadowHeight, setShadowHeight] = useState<number | null>(null);
  const [textHeight, setTextHeight] = useState<number | null>(null);

  const animationDelay = (index + 1) * 0.15;
  const flipTime = ".3s";

  const borderColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const boxShadowColor = `rgb(${color.red * 0.8}, ${color.green * 0.8}, ${
    color.blue * 0.8
  })`;

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
      sx={{
        animation: `${flipOuterKeys} ${flipTime}`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <Box
        ref={gameCardRef}
        sx={{
          position: "relative",
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
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 1,
            backgroundColor: `${borderColor}`,
            animation: `${flipInnerKeys} ${flipTime} forwards`,
            animationDelay: `${animationDelay}s`,
          }}
        ></Box>
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
            sx={{
              fontSize: `${textHeight ? textHeight / 10 : 10}px`,
            }}
          >
            {title}
          </Typography>
        </Box>
        {numberOfPlayers === 0 ? (
          <PlusIcon height="60%" color={borderColor} />
        ) : (
          <GameIcon height="60%" color={borderColor} />
        )}

        <Box sx={{ height: "10%", display: "flex" }}>
          {numberOfPlayers != 0 && (
            <Typography
              sx={{
                fontSize: `${textHeight ? textHeight / 10 : 10}px`,
                paddingLeft: 1,
                paddingRight: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {numberOfPlayers}
            </Typography>
          )}
          {numberOfPlayers != 0 && (
            <PlayerIcon height="90%" color={theme.palette.primary.main} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GameCard;

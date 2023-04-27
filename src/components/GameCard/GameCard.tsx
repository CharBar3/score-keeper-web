// "use client";
import { Color, Game } from "@/models";
import {
  Box,
  Card,
  CardContent,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import GameCardIcon from "../../../public/icons/cards_icon_01_updated.svg";
import GameCardPeopleIcon from "../../../public/icons/friends_botton_icon-07.svg";

import { theme } from "@/config/theme";

interface GameCardProps {
  title: string;
  playerIds: string[];
  color: Color;
}

const GameCard: FC<GameCardProps> = ({ title, playerIds, color }) => {
  const boxShadowColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
  const borderColor = `rgba(${color.red}, ${color.green}, ${color.blue}, .8)`;

  const StyledGameCard = styled("div")(({ theme }) => ({
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
  }));
  const StyledGamePlayerNumber = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(400)]: {
      fontSize: "15px",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.only("lg")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.only("xl")]: {
      fontSize: "30px",
    },
  }));

  return (
    <StyledGameCard>
      <Typography
        variant="h4"
        textAlign="center"
        // noWrap
        sx={{
          paddingTop: "10%",
          [theme.breakpoints.down(400)]: {
            paddingTop: "5%",
          },
          [theme.breakpoints.down(450)]: {
            fontSize: "20px",
          },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "50%",
        }}
      >
        <GameCardIcon color={borderColor} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "10%",
          position: "relative",
          paddingLeft: 1,
        }}
      >
        <GameCardPeopleIcon height="90%" color={theme.palette.primary.main} />
        <StyledGamePlayerNumber>{playerIds.length}</StyledGamePlayerNumber>
      </Box>
    </StyledGameCard>
  );
};

export default GameCard;

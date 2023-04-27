import { Game } from "@/models";
import { Box, Typography, styled } from "@mui/material";
import { FC } from "react";
import GameCardIconUpdated from "../../../public/icons/cards_icon_01_updated.svg";
import GameCardIcon from "../../../public/icons/cards_icon-08.svg";
import GameCardPeopleIcon from "../../../public/icons/friends_botton_icon-06.svg";
import Image from "next/image";

interface GameCardProps {
  title: string;
}

const StyledGameCard = styled("div")(({ theme }) => ({
  borderColor: "orange",
  borderStyle: "solid",
  borderWidth: "7px",
  borderRadius: "7px",
  boxShadow: "0px 20px darkOrange",
  marginBottom: "20px",
  aspectRatio: "13/14",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // [theme.breakpoints.only("xs")]: {
  //   borderWidth: "5px",
  //   borderRadius: "7px",
  //   boxShadow: "0px 20px darkOrange",
  //   marginBottom: "20px",
  // },
  // [theme.breakpoints.only("sm")]: {
  //   borderWidth: "10px",
  //   borderRadius: "7px",
  //   boxShadow: "0px 30px darkOrange",
  //   marginBottom: "30px",
  // },
  // [theme.breakpoints.only("md")]: {
  //   borderWidth: "10px",
  //   borderRadius: "7px",
  //   boxShadow: "0px 30px darkOrange",
  //   marginBottom: "30px",
  // },
  // [theme.breakpoints.only("lg")]: {
  //   borderWidth: "20px",
  //   boxShadow: "0px 30px 0px darkorange",
  //   marginBottom: "10px",
  // },
  // [theme.breakpoints.only("xl")]: {
  //   borderWidth: "20px",
  //   boxShadow: "0px 30px 0px darkorange",
  //   marginBottom: "10px",
  // },
}));

const GameCard: FC<GameCardProps> = ({ title }) => {
  return (
    <StyledGameCard>
      <Typography
        sx={{
          color: "grey",
          marginTop: "10%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
        variant="h4"
        textAlign="center"
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "50%",
          position: "relative",
        }}
      >
        <GameCardIconUpdated color="grey" />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "10%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "10%",
            height: "100%",
            position: "relative",
          }}
        >
          <GameCardIconUpdated color="green" />
        </Box>
      </Box>
    </StyledGameCard>
  );
};

export default GameCard;

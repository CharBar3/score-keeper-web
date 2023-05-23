"use client";

import { useDataStore } from "@/providers/User";

import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useState } from "react";
import GameCard from "../GameCard/GameCard";
import SearchBar from "../SearchBar/SearchBar";
import { keyframes, styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grow,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";
import { TransitionGroup } from "react-transition-group";

interface GameListProps {}

const growAnimation = keyframes`
0% {
  opacity: 0;
  // transform: translate(0) scale(0);
  width: 0%
}
100% {
  opacity: 1;
  width: 100%
  // transform: translate(200px, 200px) scale(1);
}
`;

// const StyledGridItem = styled(Grid)(({ theme }) => ({
//   backgroundColor: "red",
//   animation: `${growAnimation} 2s`,
// }));

const GameList: FC<GameListProps> = () => {
  const { gameList } = useDataStore();
  const theme = useTheme();

  const [gameFilter, setGameFilter] = useState<string>("");

  let showGames = null;

  if (gameList) {
    showGames = gameList
      .filter(({ title }) =>
        title.toLowerCase().includes(gameFilter.toLowerCase())
      )
      .map(({ id, title, color, players }, index) => {
        return (
          <Grid key={id} xs={6} sm={6} md={4}>
            <Link href={`dashboard/game/${id}`}>
              <GameCard
                title={title}
                color={color}
                numberOfPlayers={players.length}
                index={index}
              />
            </Link>
          </Grid>
        );
      });
  }

  const filterGames = (searchTerm: string | null) => {
    // startTransition(() => {
    if (searchTerm) {
      setGameFilter(searchTerm);
    } else {
      setGameFilter("");
    }
    // });
  };

  return (
    <Stack spacing={1} sx={{ maxWidth: "900px", margin: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ flexGrow: 1, padding: "0px 8px" }}
      >
        <SearchBar
          placeholder="Search Games"
          onChangeSearch={filterGames}
          debounce={null}
        />
        <Link href="dashboard/game/new">
          <Button
            variant="dark"
            sx={{
              minWidth: "0px",
              margin: "0px 0px 8px 0px",
              width: "100%",
              height: "40px",
            }}
          >
            <PlusIcon height="100%" />
          </Button>
        </Link>
      </Stack>
      <Collapse in={!showGames}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "32px",
          }}
        >
          <Typography>Loading</Typography>
          <CircularProgress size={"24px"} sx={{ marginLeft: 1 }} />
        </Box>
      </Collapse>
      <Grid container spacing={{ xs: 2 }}>
        {showGames}
      </Grid>
    </Stack>
  );
};

export default GameList;

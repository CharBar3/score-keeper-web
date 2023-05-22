"use client";

import { useDataStore } from "@/providers/User";

import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useState } from "react";
import GameCard from "../GameCard/GameCard";
import SearchBar from "../SearchBar/SearchBar";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import PlusIcon from "../../../public/icons/plus_icon_55px.svg";

interface GameListProps {}

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
      .map(({ id, title, color, players }) => {
        return (
          <Grid key={id} xs={6} sm={6} md={4} lg={3} xl={3}>
            <Link href={`dashboard/game/${id}`}>
              <GameCard
                title={title}
                color={color}
                numberOfPlayers={players.length}
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
    <Stack spacing={1} sx={{ marginBottom: "56px" }}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }}>
        <Grid xs={9}>
          <SearchBar
            placeholder="Search Games"
            onChangeSearch={filterGames}
            debounce={null}
          />
        </Grid>
        <Grid xs={3}>
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
        </Grid>
        <Grid xs={12}>
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
        </Grid>
        {showGames}
      </Grid>
    </Stack>
  );
};

export default GameList;

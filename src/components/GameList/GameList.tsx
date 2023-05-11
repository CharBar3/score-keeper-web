"use client";

import { useDataStore } from "@/providers/User";

import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useState } from "react";
import GameCard from "../GameCard/GameCard";
import SearchBar from "../SearchBar/SearchBar";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";

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
        <Grid xs={12}>
          <SearchBar
            placeholder="Search Games"
            onChangeSearch={filterGames}
            debounce={null}
          />
        </Grid>
        <Grid xs={6} sm={6} md={4} lg={3} xl={3}>
          <Link href="dashboard/game/new">
            <GameCard
              title={"New Game"}
              numberOfPlayers={0}
              color={{ red: 193, green: 197, blue: 202 }}
            />
          </Link>
        </Grid>
        {showGames}
      </Grid>
    </Stack>
  );
};

export default GameList;
